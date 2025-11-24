export class TimerMock {

	constructor() {
	}

	on(ms, callback) {
		setTimeout(() => {
			callback()
		}, ms)
	}
}