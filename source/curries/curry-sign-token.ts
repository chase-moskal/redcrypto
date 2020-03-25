
import {SignToken} from "../interfaces.js"
import {tokenSign} from "../token-sign.js"

export function currySignToken(privateKey: string): SignToken {
	return async<Payload extends {}>(
		payload: Payload,
		expiresMilliseconds: number
	): Promise<string> => tokenSign({payload, privateKey, expiresMilliseconds})
}
