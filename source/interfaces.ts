
import {Algorithm} from "jsonwebtoken"
import {HexBase64Latin1Encoding} from "crypto"

export interface SignatureSettings {
	algorithm: string
	format: HexBase64Latin1Encoding
}

export interface TokenSettings {
	algorithm: Algorithm
}

export interface TokenData<Payload> {
	iat: any
	exp: any
	payload: Payload
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

export interface TokenSignOptions<Payload> extends Partial<TokenSettings> {
	payload: Payload
	privateKey: string
	expiresMilliseconds: number
}

export interface TokenVerifyOptions {
	token: string
	publicKey: string
}

// curries

export type SignToken = <Payload extends {}>(
	payload: Payload,
	expiresMilliseconds: number
) => Promise<string>

export type VerifyToken = <Payload extends {}>(
	token: string
) => Promise<Payload>
