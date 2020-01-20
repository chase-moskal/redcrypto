
import {SignatureVerify} from "./interfaces.js"
import {smartImport} from "./internals/smart-import.js"

const promise = smartImport<{signatureVerify: SignatureVerify}>(
	"signature-verify.js"
)

export const signatureVerify: SignatureVerify =
	async(options) => (await promise).signatureVerify(options)
