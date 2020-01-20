
import {Suite} from "cynic"
import {Read} from "./interfaces.js"
import {smartImport} from "./internals/smart-import.js"
import {prepareSignatureTestingSuite} from "./signature.test.js"

export default <Suite>(async(): Promise<Suite> => {
	const {read} = await smartImport<{read: Read}>("./read.js")

	const publicKey = await read("public.pem")
	const privateKey = await read("private.pem")
	const body = "testbodylol"

	return {
		"signatures": prepareSignatureTestingSuite({body, publicKey, privateKey})
	}
})
