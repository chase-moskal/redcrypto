
import {promises} from "fs"

const {readFile} = promises

export const read = async(path: string) => readFile(path, "utf8")
