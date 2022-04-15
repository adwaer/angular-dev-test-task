export class Notify {
	static readonly type = '[Notify] Set message';
	constructor(public payload: string) {
	}
}
