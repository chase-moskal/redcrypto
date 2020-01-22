
import {Suite} from "cynic"
import {tokenSign} from "../../token-sign.js"
import {tokenVerify} from "../../token-verify.js"
import {tokenDecode} from "../../token-decode.js"

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
			expiresIn: 100,
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
			expiresIn: 1,
		})
		await nap(1.1)
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
			expiresIn: 100,
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

	"decode a token without verification": async() => {
		const token = await tokenSign<typeof payload>({
			payload,
			privateKey,
			expiresIn: 100,
		})
		const {payload: payload2} = await tokenDecode<typeof payload>(token)
		return (
			payload2.a === payload.a &&
			payload2.b === payload.b
		)
	},
})

const nap = (seconds: number) => new Promise(
	resolve => setTimeout(resolve, seconds * 1000)
)

function tamperStringHalfway(subject: string) {
	const {length} = subject
	return Array.from(subject).map(
		(character, index) => index === Math.floor(length / 2)
			? "@"
			: character
	).join("")
}
