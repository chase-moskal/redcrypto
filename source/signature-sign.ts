
import {SignatureSign} from "./interfaces.js"
import {smartImport} from "./internals/smart-import.js"

const promise = smartImport<SignatureSign>(
	"signature-sign.js",
	"signatureSign"
)

export const signatureSign: SignatureSign =
	async(options) => (await promise)(options)
