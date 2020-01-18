
import {promises} from "fs"

import {signatureSign} from "./signature-sign.js"
import {signatureVerify} from "./signature-verify.js"

const {readFile} = promises

describe("signatures", () => {
	const body = "testbodylol"
	const keys = (async() => ({
		publicKey: await readFile("public.pem", "utf8"),
		privateKey: await readFile("private.pem", "utf8")
	}))()

	it("can sign and verify data", async() => {
		const {privateKey, publicKey} = await keys
		const signature = await signatureSign({body, privateKey})
		const valid = await signatureVerify({
			body,
			signature,
			publicKey,
		})
		expect(valid).toBe(true)
	})

	it("can detect tampered data", async() => {
		const {privateKey, publicKey} = await keys
		const signature = await signatureSign({body, privateKey})
		const valid = await signatureVerify({
			body: body + "2",
			signature,
			publicKey,
		})
		expect(valid).toBe(false)
	})

	it("can detect invalid signature", async() => {
		const {privateKey, publicKey} = await keys
		const signature = await signatureSign({body, privateKey})
		const valid = await signatureVerify({
			body,
			signature: signature.slice(1),
			publicKey,
		})
		expect(valid).toBe(false)
	})

	it("throws on invalid public key", async() => {
		const {privateKey, publicKey} = await keys
		const signature = await signatureSign({body, privateKey})
		const shouldFail = (async() => signatureVerify({
			body,
			signature,
			publicKey: publicKey.slice(1),
		}))
		await expect(shouldFail()).rejects.toBeTruthy()
	})
})
