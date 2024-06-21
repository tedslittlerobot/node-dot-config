import {existsSync} from 'node:fs';
import {env} from 'node:process';
import {readFile, writeFile} from 'node:fs/promises';
import {type Scribe} from '../types.js';

export class FilesystemScribe implements Scribe {
	constructor(public prefix?: string, public directory = `${env.HOME}/.config`) {}

	fullPath(path: string): string {
		if (this.prefix) {
			return `${this.directory}/${this.prefix}/${path}`;
		}

		return `${this.directory}/${path}`;
	}

	exists(path: string): boolean {
		return existsSync(this.fullPath(path));
	}

	async read(path: string): Promise<string> {
		return readFile(path, 'utf8');
	}

	async write(path: string, contents: string): Promise<void> {
		await writeFile(path, contents, 'utf8');
	}
}
