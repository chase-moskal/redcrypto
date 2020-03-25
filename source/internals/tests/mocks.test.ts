
import {Suite, expect} from "cynic"
import {mockSignToken} from "../../curries/mock-sign-token.js"
import {mockVerifyToken} from "../../curries/mock-verify-token.js"

export const prepareMocksTestingSuite = (): Suite => ({

	"mock tokens can be signed and verified with payloads": async() => {
		const payload1 = {bananas: 123}
		const expiresMilliseconds = 1000 * 60 * 60

		const signToken = mockSignToken()
		const verifyToken = mockVerifyToken()

		const token = await signToken(payload1, expiresMilliseconds)
		const payload2 = await verifyToken<typeof payload1>(token)

		return (
			expect(payload2).defined() &&
			expect(payload2.bananas).defined() &&
			expect(payload2.bananas).equals(payload1.bananas)
		)
	},
})
