
import * as base64 from "./base64.js"
import {TokenData, TokenDecode} from "./types.js"

export const tokenDecode: TokenDecode = function decode<Payload>(
		token: string
	): TokenData<Payload> {

	const [,data] = token.split(".")

	const json = decodeURIComponent(
		base64.url.decode(data)
			.split("")
			.map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
			.join("")
	)

	return JSON.parse(json)
}
