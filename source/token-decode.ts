
import {TokenData} from "./interfaces.js"
import * as base64 from "./internals/toolbox/base64.js"

export function tokenDecode<Payload>(token: string): TokenData<Payload> {
	const [,data] = token.split(".")
	const json = decodeURIComponent(
		base64.url.toText(data)
			.split("")
			.map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
			.join("")
	)
	return JSON.parse(json)
}
