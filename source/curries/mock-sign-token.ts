
import * as base64 from "../internals/toolbox/base64.js"
import {TokenData, SignToken, TokenSignOptions} from "../interfaces.js"

const tokenize = (object: {}) => (
	base64.url.fromText(
		JSON.stringify(object)
	)
)

export function mockSignToken(): SignToken {
	return async<Payload extends {}>({
		payload,
		expiresMilliseconds,
	}: TokenSignOptions<Payload>): Promise<string> => {
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
