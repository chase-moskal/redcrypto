
import * as base64 from "../internals/toolbox/base64.js"
import {TokenData, SignToken, TokenSignOptions} from "../types.js"

const tokenize = (object: {}) => (
	base64.url.encode(
		JSON.stringify(object)
	)
)

export function mockSignToken(): SignToken {
	return async<Payload extends {}>({
		payload,
		lifespan,
	}: TokenSignOptions<Payload>): Promise<string> => {
		const data: TokenData<any> = {
			payload,
			iat: Date.now(),
			exp: Date.now() + lifespan,
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
