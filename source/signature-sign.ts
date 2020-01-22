
import {createSign} from "crypto"
import {SignatureSignOptions} from "./interfaces.js"
import {defaultSignatureSettings} from "./internals/default-signature-settings.js"

export async function signatureSign(options: SignatureSignOptions): Promise<string> {
	const {
		body,
		format,
		algorithm,
		privateKey,
	} = {...defaultSignatureSettings, ...options}

	const signer = createSign(algorithm)
	signer.write(body)
	signer.end()

	return signer.sign(privateKey, format)
}
