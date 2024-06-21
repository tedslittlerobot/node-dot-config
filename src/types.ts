
export type ConfigEncoder = {
	handles(extension: string, file: string): boolean;
	encode<T>(config: T): Promise<string> | string;
	decode<T>(raw: string): Promise<T> | T;
};

export type Scribe = {
	exists(file: string): boolean;
	read(file: string): Promise<string>;
	write(file: string, content: string): Promise<void>;
};
