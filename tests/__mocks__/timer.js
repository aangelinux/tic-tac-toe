export class TimerMock {

	constructor() {
	}

	on(ms, ...callback) {
		setTimeout(() => {
			callback.forEach(func => func())
		}, ms)
	}
}