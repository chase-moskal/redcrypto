
import {Suite} from "cynic"

import {tokenSign} from "./token-sign.js"
import {tokenVerify} from "./token-verify.js"

const nap = (duration: number) => new Promise(
	resolve => setTimeout(resolve, duration)
)

function tamperStringHalfway(subject: string) {
	const {length} = subject
	return Array.from(subject).map(
		(character, index) => index === Math.floor(length / 2)
			? "@"
			: character
	).join("")
}

export const prepareTokenTestingSuite = ({
	payload,
	publicKey,
	privateKey,
}: {
	payload: {
		a: boolean
		b: number
	}
	publicKey: string
	privateKey: string
}): Suite => ({

	"signed token passes verification": async() => {
		const token = await tokenSign<typeof payload>({
			payload,
			privateKey,
			expiresIn: 100 * 1000,
		})
		const {payload: payload2} = await tokenVerify<typeof payload>({
			token,
			publicKey,
		})
		return (
			payload2.a === payload.a &&
			payload2.b === payload.b
		)
	},

	"expired token fails verification": async() => {
		const token = await tokenSign<typeof payload>({
			payload,
			privateKey,
			expiresIn: 1 * 1000,
		})
		await nap(1.1 * 1000)
		try {
			await tokenVerify({
				token,
				publicKey,
			})
			return false
		}
		catch (error) {
			return true
		}
	},

	"tampered token fails verification": async() => {
		let goodToken = await tokenSign<typeof payload>({
			payload,
			privateKey,
			expiresIn: 100 * 1000,
		})
		const badToken = tamperStringHalfway(goodToken)
		try {
			await tokenVerify({
				token: badToken,
				publicKey,
			})
			return false
		}
		catch (error) {
			return true
		}
	},
})
