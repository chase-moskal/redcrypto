
import {Suite, expect} from "cynic"
import * as base64 from "../toolbox/base64.js"

function loopback(s: string) {
	return base64.toText(base64.fromText(s))
}

function urlLoopback(s: string) {
	return base64.url.toText(base64.url.fromText(s))
}

function jsonLoopback(x: any) {
	const based = base64.url.fromText(JSON.stringify(x))
	return JSON.parse(base64.url.toText(based))
}

export default <Suite>{
	"process basic string": async() => {
		const original = "hello, this is a test"
		return (true
			&& expect(loopback(original)).equals(original)
			&& expect(urlLoopback(original)).equals(original)
			&& expect(jsonLoopback(original)).equals(original)
		)
	},
	"process string with special characters": async() => {
		const original = "hola, !@#$%^&*()-=\\"
		return (true
			&& expect(loopback(original)).equals(original)
			&& expect(urlLoopback(original)).equals(original)
			&& expect(jsonLoopback(original)).equals(original)
		)
	},
	"process some unsplash link": async() => {
		const original = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9"
		return (true
			&& expect(loopback(original)).equals(original)
			&& expect(urlLoopback(original)).equals(original)
			&& expect(jsonLoopback(original)).equals(original)
		)
	},
}
