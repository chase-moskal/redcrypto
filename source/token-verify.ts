
import jsonwebtoken from "jsonwebtoken"
import {TokenData, TokenVerifyOptions} from "./interfaces.js"

export async function tokenVerify<Payload>({
	token,
	publicKey,
}: TokenVerifyOptions): Promise<TokenData<Payload>> {
	return new Promise<TokenData<Payload>>((resolve, reject) => {
		jsonwebtoken.verify(token, publicKey, (error, data: TokenData<Payload>) => {
			if (error) reject(error)
			else resolve(data)
		})
	})
}
