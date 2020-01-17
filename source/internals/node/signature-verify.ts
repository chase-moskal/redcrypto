
import {createVerify} from "crypto"
import {algorithm, format} from "../constants.js"

import {SignatureVerify} from "../../interfaces.js"

export const signatureVerify: SignatureVerify = async({
	body,
	signature,
	publicKey,
}): Promise<boolean> => {

	const verifier = createVerify(algorithm)
	verifier.write(body)
	verifier.end()

	const veracity = verifier.verify(publicKey, signature, format)
	return veracity
}
