
export const inBrowser: boolean = (function() {
	try {
		return window === this
	}
	catch (error) {
		return false
	}
})()
