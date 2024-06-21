import {type ConfigEncoder} from 'src/types.js';

export class JsonEncoder implements ConfigEncoder {
	handles(extension: string): boolean {
		return extension === 'json';
	}

	encode<T>(config: T): string {
		return JSON.stringify(config);
	}

	decode<T>(raw: string): T {
		return JSON.parse(raw) as T;
	}
}
