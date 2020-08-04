
import {createVerify} from "crypto"
import {SignatureVerifyOptions} from "./types.js"
import {defaultSignatureSettings} from "./internals/default-signature-settings.js"

export function signatureVerify(options: SignatureVerifyOptions): boolean {
	const {
		body,
		format,
		algorithm,
		signature,
		publicKey,
	} = {...defaultSignatureSettings, ...options}

	const verifier = createVerify(algorithm)
	verifier.write(body)
	verifier.end()

	return verifier.verify(publicKey, signature, format)
}
