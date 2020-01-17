
import {SignatureVerify} from "./interfaces.js"
import {smartImport} from "./internals/smart-import.js"

const promise = smartImport<SignatureVerify>(
	"signature-verify.js",
	"signatureVerify"
)

export const signatureVerify: SignatureVerify =
	async(options) => (await promise)(options)
