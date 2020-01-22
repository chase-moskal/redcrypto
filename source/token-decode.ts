
import {TokenData} from "./interfaces.js"
import {base64ToText} from "./internals/toolbox/base64.js"

export function tokenDecode<Payload>(token: string): TokenData<Payload> {
	const b64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
	const data = decodeURIComponent(
		base64ToText(b64)
			.split("")
			.map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
			.join("")
	)
	return JSON.parse(data)
}
