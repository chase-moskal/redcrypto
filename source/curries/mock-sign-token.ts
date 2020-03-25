
import {TokenData, SignToken} from "../interfaces.js"
import * as base64 from "../internals/toolbox/base64.js"

const tokenize = (object: {}) => (
	base64.url.fromText(
		JSON.stringify(object)
	)
)

export function mockSignToken(): SignToken {
	return async<Payload extends {}>(
		payload: Payload,
		expiresMilliseconds: number
	): Promise<string> => {
		const data: TokenData<any> = {
			payload,
			iat: Date.now(),
			exp: Date.now() + expiresMilliseconds,
		}
		const header: {alg: any; typ: string} = {
			alg: null,
			typ: "JWT",
		}
		const signature = "fake-mock-token-signature"
		return [
			tokenize(header),
			tokenize(data),
			tokenize(signature),
		].join(".")
	}
}
