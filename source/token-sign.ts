
import jsonwebtoken, {SignOptions} from "jsonwebtoken"

import {TokenSignOptions, TokenSign} from "./types.js"
import {defaultTokenSettings} from "./internals/default-token-settings.js"

export const tokenSign: TokenSign = async function sign<Payload>(
		options: TokenSignOptions<Payload>
	): Promise<string> {

	const {
		payload,
		algorithm,
		privateKey,
		expiresMilliseconds,
	} = {...defaultTokenSettings, ...options}

	const data: {payload: Payload} = {payload}
	const signOptions: SignOptions = {
		algorithm,
		expiresIn: expiresMilliseconds / 1000
	}

	return new Promise<string>((resolve, reject) => {
		jsonwebtoken.sign(
			data,
			privateKey,
			signOptions,
			(error, token) => {
				if (error) reject(error)
				else resolve(token)
			}
		)
	})
}
