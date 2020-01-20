
import {promises} from "fs"
import {Read} from "../../interfaces.js"

const {readFile} = promises

export const read: Read = async(path: string) =>
	readFile(path, "utf8")
