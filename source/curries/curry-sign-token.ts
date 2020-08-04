
import {tokenSign} from "../token-sign.js"
import {SignToken, TokenSignOptions} from "../types.js"

export function currySignToken(privateKey: string): SignToken {
	return async<Payload extends {}>({
		payload,
		expiresMilliseconds,
	}: TokenSignOptions<Payload>): Promise<string> =>
		tokenSign({payload, privateKey, expiresMilliseconds})
}
