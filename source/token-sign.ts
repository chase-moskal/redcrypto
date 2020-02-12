
import jsonwebtoken, {SignOptions} from "jsonwebtoken"

import {TokenSignOptions} from "./interfaces.js"
import {defaultTokenSettings} from "./internals/default-token-settings.js"

export async function tokenSign<Payload>(
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
