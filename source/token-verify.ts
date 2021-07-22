
import * as jwt from "./internals/badmodules/jsonwebtoken.js"
import {TokenData, TokenVerifyOptions, TokenVerify} from "./types.js"

export const tokenVerify: TokenVerify = async function verify<Payload>({
		token,
		publicKey,
	}: TokenVerifyOptions): Promise<Payload> {

	const {payload} = await new Promise<TokenData<Payload>>((resolve, reject) => {
		jwt.verify(token, publicKey, (error, data: TokenData<Payload>) => {
			if (error) reject(error)
			else resolve(data)
		})
	})

	return payload
}
