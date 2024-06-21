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
}
