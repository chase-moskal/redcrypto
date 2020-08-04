
import {Algorithm} from "jsonwebtoken"
import {HexBase64Latin1Encoding} from "crypto"

//
// tokens
//

export interface TokenSettings {
	algorithm: Algorithm
}

export interface TokenData<Payload> {
	iat: any
	exp: any
	payload: Payload
}

export interface TokenSignOptions<Payload> extends Partial<TokenSettings> {
	payload: Payload
	lifespan: number
	privateKey: string
}

export interface TokenVerifyOptions {
	token: string
	publicKey: string
}

export type TokenSign = <Payload extends {}>(
	options: TokenSignOptions<Payload>
) => Promise<string>

export type TokenVerify = <Payload extends {}>(
	options: TokenVerifyOptions
) => Promise<Payload>

export type TokenDecode = <Payload extends {}>(
	token: string
) => TokenData<Payload>

// curried

export type SignToken = <Payload extends {}>(options: {
	payload: Payload
	lifespan: number
}) => Promise<string>

export type VerifyToken = <Payload extends {}>(
	token: string
) => Promise<Payload>

//
// signatures
//

export interface SignatureSettings {
	algorithm: string
	format: HexBase64Latin1Encoding
}

export interface SignatureSignOptions extends Partial<SignatureSettings> {
	body: string
	privateKey: string
}

export interface SignatureVerifyOptions extends Partial<SignatureSettings> {
	body: string
	signature: string
	publicKey: string
}
