import {type Scribe, type ConfigEncoder} from './types.js';
import {JsonEncoder} from './encoders/json-encoder.class.js';
import {YamlEncoder} from './encoders/yaml-encoder.class.js';
import {FilesystemScribe} from './scribes/filesystem-scribe.class.js';
import {encoderMatch} from './utils.js';
import {ConfigCache} from './config-cache.class.js';
import {NoConfigFile} from './errors.js';

type ErrorIfNotFoundToken = {__errorIfNotFound: true};
const errorIfNotFoundToken: ErrorIfNotFoundToken = {__errorIfNotFound: true};

export type DotConfigEvent<T> = {
	type: string;
	path: string;
	config?: T;
	encoded?: string;
};

export type DotConfigEventHandler<T> = (event: DotConfigEvent<T>) => Promise<void>;

export class DotConfig extends EventTarget {
	public scribe: Scribe = new FilesystemScribe();
	public encoders: ConfigEncoder[] = [new JsonEncoder(), new YamlEncoder()];
	public fallbackEncoder?: ConfigEncoder;
	public subscribers: Record<string, DotConfigEventHandler<any>> = {};

	public cache = new ConfigCache();

	async persist(path: string) {
		await this.emit('persisting', {path});

		const config = this.cache.items[path];
		if (!config) {
			throw new Error(`No config to persist for ${path}`);
		}

		const encoder = encoderMatch(path, this.encoders, this.fallbackEncoder);
		const encoded = await encoder.encode(config);

		await this.scribe.write(path, encoded);

		await this.emit('persisted', {path, config, encoded});
	}

	async set<T>(path: string, config: T, persist = true): Promise<T> {
		this.cache.items[path] = config;

		if (persist) {
			await this.persist(path);
		}

		return config;
	}

	async remove(path: string): Promise<void> {
		await this.scribe.destroy(path);
	}

	async get<T>(path: string, defaultValue: T | undefined | ErrorIfNotFoundToken = errorIfNotFoundToken): Promise<T | undefined> {
		if (!this.cache.items[path]) {
			await this.load(path, defaultValue);
		}

		return this.cache.items[path] as T;
	}

	async load<T>(path: string, defaultValue: T | undefined | ErrorIfNotFoundToken = errorIfNotFoundToken) {
		await this.emit('loading', {path});

		const encoder = encoderMatch(path, this.encoders, this.fallbackEncoder);

		if (!this.scribe.exists(path)) {
			if (defaultValue === errorIfNotFoundToken) {
				throw new NoConfigFile(path);
			}

			await this.emit('loaded:default', {path, config: defaultValue});
			return defaultValue;
		}

		const encoded = await this.scribe.read(path);
		const config = encoder.decode(encoded);
		this.cache.items[path] = config;

		await this.emit('loaded', {path, encoded, config});

		return config as T;
	}

	private async emit<T>(type: string, contents: Omit<DotConfigEvent<T>, 'type'>) {
		for (const subscriber of Object.values(this.subscribers)) {
			// eslint-disable-next-line no-await-in-loop
			await subscriber({type, ...contents});
		}
	}
}
