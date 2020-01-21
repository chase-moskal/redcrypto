
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

export interface TokenData<Payload> {
	iat: any
	exp: any
	payload: Payload
}

export interface TokenSignOptions<Payload> {
	payload: Payload
	expiresIn: number
	privateKey: string
}

export interface TokenVerifyOptions {
	token: string
	publicKey: string
}

export type TokenSign<Payload> = (options: TokenSignOptions<Payload>) =>
	Promise<string>

export type TokenVerify<Payload> = (options: TokenVerifyOptions) =>
	Promise<TokenData<Payload>>
