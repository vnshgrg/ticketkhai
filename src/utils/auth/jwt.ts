import jwt from "jsonwebtoken"

export const signJWT = (data: any): string => {
  return jwt.sign(data, process.env.NEXTAUTH_SECRET)
}

export const verifyJWT = (token: string): any => {
  return jwt.verify(token, process.env.NEXTAUTH_SECRET)
}

export const decodeJWT = (token: string): any => {
  return jwt.verify(token, process.env.NEXTAUTH_SECRET)
}
