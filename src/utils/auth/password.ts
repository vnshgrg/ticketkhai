import bcrypt from "bcryptjs"

export const encodePassword = (raw: string): string => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(raw, salt)
}

export const matchPassword = (raw: string, encoded: string): boolean => {
  return bcrypt.compareSync(raw, encoded)
}
