
import {smartImport} from "./internals/smart-import.js"
import {TokenSign, TokenSignOptions} from "./interfaces.js"

const promise = smartImport<{tokenSign: TokenSign<any>}>(
	"token-sign.js"
)

export async function tokenSign<Payload>(
	options: TokenSignOptions<Payload>
): Promise<string> {
	return (await promise).tokenSign(options)
}
