
import {TokenSignOptions, TokenSign} from "./types.js"
import * as jwt from "./internals/badmodules/jsonwebtoken.js"
import {defaultTokenSettings} from "./internals/default-token-settings.js"

export const tokenSign: TokenSign = async function<Payload>(
		options: TokenSignOptions<Payload>
	): Promise<string> {

	const {
		payload,
		lifespan,
		algorithm,
		privateKey,
	} = {...defaultTokenSettings, ...options}

	const data: {payload: Payload} = {payload}
	const signOptions: jwt.SignOptions = {
		algorithm,
		expiresIn: lifespan / 1000,
	}

	return new Promise<string>((resolve, reject) => {
		jwt.sign(
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
