
import {VerifyToken} from "../interfaces.js"
import {tokenDecode} from "../token-decode.js"

export const mockVerifyToken = (): VerifyToken =>
	async<Payload extends {}>(token: string): Promise<Payload> =>
		tokenDecode<Payload>(token).payload
