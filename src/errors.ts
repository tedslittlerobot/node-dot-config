
export class NoConfigEncoder extends Error {
	constructor(public readonly extension: string | undefined, public readonly file: string) {
		super(`No config encoder for extension ${extension} / file ${file}`);
	}
}

export class NoConfigFile extends Error {
	constructor(public readonly path: string) {
		super(`Config file ${path} not found`);
	}
}
