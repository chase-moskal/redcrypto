
export type Read = (path: string) => Promise<string>

export type SignatureSign = (options: {
	body: string
	privateKey: string
}) => Promise<string>

export type SignatureVerify = (options: {
	body: string
	signature: string
	publicKey: string
}) => Promise<boolean>
