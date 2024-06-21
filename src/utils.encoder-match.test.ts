/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {encoderMatch} from './utils.js';
import {JsonEncoder} from './encoders/json-encoder.class.js';
import {NoConfigEncoder} from './errors.js';
import {YamlEncoder} from './encoders/yaml-encoder.class.js';

const jsonEncoder = new JsonEncoder();
const yamlEncoder = new YamlEncoder();

test('returns json encoder for json file', t => {
	t.is(
		encoderMatch('foo.json', [jsonEncoder]),
		jsonEncoder,
	);
});

test('throws if no encoders are found', t => {
	t.throws(() => encoderMatch('foo', [jsonEncoder]), {
		instanceOf: NoConfigEncoder,
	});
});

test('returns yaml encoder for yaml files', t => {
	t.is(
		encoderMatch('foo.yaml', [jsonEncoder, yamlEncoder]),
		yamlEncoder,
	);
	t.is(
		encoderMatch('foo.yml', [jsonEncoder, yamlEncoder]),
		yamlEncoder,
	);
});

test('falls back to fallback encoder', t => {
	t.is(
		encoderMatch('foo.json', [], jsonEncoder),
		jsonEncoder,
	);
});
