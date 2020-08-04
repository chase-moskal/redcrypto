
import jsonwebtoken from "jsonwebtoken"
import {TokenData, TokenVerifyOptions, TokenVerify} from "./types.js"

export const tokenVerify: TokenVerify = async function verify<Payload>({
		token,
		publicKey,
	}: TokenVerifyOptions): Promise<Payload> {

	const {payload} = await new Promise<TokenData<Payload>>((resolve, reject) => {
		jsonwebtoken.verify(token, publicKey, (error, data: TokenData<Payload>) => {
			if (error) reject(error)
			else resolve(data)
		})
	})

	return payload
}
