
import {VerifyToken} from "../types.js"
import {tokenDecode} from "../token-decode.js"

export const mockVerifyToken = (): VerifyToken => async<Payload extends {}>(
		token: string
	): Promise<Payload> => {
	const decoded = tokenDecode<Payload>(token)
	if (decoded.exp < Date.now()) throw new Error("token expired")
	return decoded.payload
}
