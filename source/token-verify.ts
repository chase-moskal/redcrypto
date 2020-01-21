
import {smartImport} from "./internals/smart-import.js"
import {TokenVerify, TokenVerifyOptions, TokenData} from "./interfaces.js"

const promise = smartImport<{tokenVerify: TokenVerify<any>}>(
	"token-verify.js"
)

export async function tokenVerify<Payload>(
	options: TokenVerifyOptions
): Promise<TokenData<Payload>> {
	return (await promise).tokenVerify(options)
}
