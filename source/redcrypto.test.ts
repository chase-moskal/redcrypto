
import {Suite} from "cynic"

import {smartImport} from "./internals/smart-import.js"

import {Read} from "./interfaces.js"
import {prepareTokenTestingSuite} from "./token.test.js"
import {prepareSignatureTestingSuite} from "./signature.test.js"

export default <Suite>(async(): Promise<Suite> => {
	const {read} = await smartImport<{read: Read}>("./read.js")

	const body = "testbodylol"
	const payload = {a: true, b: 2}
	const publicKey = await read("public.pem")
	const privateKey = await read("private.pem")

	return {
		"signatures": prepareSignatureTestingSuite({
			body,
			publicKey,
			privateKey,
		}),
		"tokens": prepareTokenTestingSuite({
			payload,
			publicKey,
			privateKey,
		})
	}
})
