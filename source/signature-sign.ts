
import {SignatureSign} from "./interfaces.js"
import {smartImport} from "./internals/smart-import.js"

const promise = smartImport<{signatureSign: SignatureSign}>(
	"signature-sign.js"
)

export const signatureSign: SignatureSign =
	async(options) => (await promise).signatureSign(options)
