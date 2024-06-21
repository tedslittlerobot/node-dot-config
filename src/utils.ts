import {NoConfigEncoder} from './errors.js';
import {type ConfigEncoder} from './types.js';

export function encoderMatch<T>(file: string, encoders: ConfigEncoder[], fallbackEncoder?: ConfigEncoder): ConfigEncoder {
	const extension = file.split('.').at(-1);

	if (extension) {
		const encoder = encoders.find(item => item.handles(extension, file));

		if (encoder) {
			return encoder;
		}
	}

	if (fallbackEncoder) {
		return fallbackEncoder;
	}

	throw new NoConfigEncoder(extension, file);
}
