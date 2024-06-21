
export class ConfigCache {
	public items: Record<string, unknown> = {};

	get all() {
		const all: Array<{key: string; value: unknown}> = [];

		for (const key of Object.keys(this.items)) {
			const value = this.items[key];

			all.push({key, value});
		}

		return all;
	}

	clear() {
		this.items = {};
	}
}
