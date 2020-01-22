
import {Suite} from "cynic"
import {signatureSign} from "../../signature-sign.js"
import {signatureVerify} from "../../signature-verify.js"

export const prepareSignatureTestingSuite = ({
	body,
	publicKey,
	privateKey,
}: {
	body: string
	publicKey: string
	privateKey: string
}): Suite => ({

	"can sign and verify data": async() => {
		const signature = await signatureSign({body, privateKey})
		const valid = await signatureVerify({
			body,
			signature,
			publicKey,
		})
		return valid
	},

	"can detect tampered data": async() => {
		const signature = await signatureSign({body, privateKey})
		const valid = await signatureVerify({
			body: body + "2",
			signature,
			publicKey,
		})
		return !valid
	},

	"can detect invalid signature": async() => {
		const signature = await signatureSign({body, privateKey})
		const valid = await signatureVerify({
			body,
			signature: signature.slice(1),
			publicKey,
		})
		return !valid
	},

	"throws on invalid public key": async() => {
		const signature = await signatureSign({body, privateKey})

		try {
			const valid = await signatureVerify({
				body,
				signature,
				publicKey: publicKey.slice(1),
			})
		}
		catch (error) {
			return true
		}

		return false
	}
})
