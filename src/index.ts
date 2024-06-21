import {DotConfig} from './dot-config.class.js';

const config = new DotConfig();
export default config;

export * from './types.js';
export * from './dot-config.class.js';
export * from './config-cache.class.js';
export * from './encoders/json-encoder.class.js';
export * from './encoders/yaml-encoder.class.js';
export * from './scribes/filesystem-scribe.class.js';
