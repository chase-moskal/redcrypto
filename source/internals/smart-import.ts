
import {inBrowser} from "./in-browser.js"

export const smartImport = <T>(path: string, key: string) => (
	async(): Promise<T> => inBrowser
		? (await import(`./browser/${path}`))[key]
		: require(`./node/${path}`)[key]
)()
