import { IsString } from "class-validator"

export type JwtTokens = {
  accessToken: string,
  refreshToken: string,
}

export type TokenPayload = {
  userId: string,
  login: string,
}

export type UpdateRefreshTokenDto = {
  refreshToken: string
}