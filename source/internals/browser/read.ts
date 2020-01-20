
import {Read} from "../../interfaces.js"

export const read: Read = async(path: string) =>
	(await fetch(path)).text()
