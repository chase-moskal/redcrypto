
import {createSign} from "crypto"
import {algorithm, format} from "../constants.js"

import {SignatureSign} from "../../interfaces.js"

export const signatureSign: SignatureSign = async({
	body,
	privateKey,
}): Promise<string> => {

	const signer = createSign(algorithm)
	signer.write(body)
	signer.end()

	const signature = signer.sign(privateKey, format)
	return signature
}
