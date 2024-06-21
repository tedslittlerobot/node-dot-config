import {type Scribe} from '../types.js';

export class InMemoryScribe implements Scribe {
	public readonly cache: Record<string, string> = {};

	exists(file: string): boolean {
		return Boolean(this.cache[file]);
	}

	async read(location: string): Promise<string> {
		return this.cache[location];
	}

	async write(location: string, contents: string): Promise<void> {
		this.cache[location] = contents;
	}

	async destroy(file: string) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.cache[file];
	}
}
