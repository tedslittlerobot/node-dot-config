import {type ConfigEncoder} from 'src/types.js';
import {parse, stringify} from 'yaml';

export class YamlEncoder implements ConfigEncoder {
	handles(extension: string): boolean {
		return ['yaml', 'yml'].includes(extension);
	}

	encode<T>(config: T): string {
		return stringify(config);
	}

	decode<T>(raw: string): T {
		return parse(raw) as T;
	}
}
