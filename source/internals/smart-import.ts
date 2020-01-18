
import {isNode} from "./is-node.js"

export const smartImport = <T>(path: string, key: string) => (
	async(): Promise<T> => isNode
		? require(`./node/${path}`)[key]
		: (await import(`./browser/${path}`))[key]
)()
