import axios from "axios"
import omit from "lodash/omit"
import NextAuth, { User, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "taro@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials
          debugger
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/login`,
            {
              username,
              password,
            }
          )
          debugger
          // If no error and we have user data, return it
          if (data) {
            const { accessToken, refreshToken, user } = data
            return { ...user, user, accessToken, refreshToken }
          }
          // Return null if user data could not be retrieved
          return null
        } catch (error) {
          console.log(error.response?.data)
          throw new Error(error.response?.data.message || "Failed to login")
        }
      },
    }),
  ],
  callbacks: {
    async signIn(data) {
      const { account } = data
      // run signIn Callback for each providers
      if (account.provider === "credentials" && account.providerAccountId) {
        return true
      }
      return false
    },

    async session({ session, token }) {
      if (token.id) {
        session.user = omit(token, [
          "accessToken",
          "refreshToken",
          "iat",
          "exp",
          "jti",
        ])
        return session
      }
      return session
    },

    async jwt({ token, user: jwtUser, account, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (jwtUser) {
        const hack: any = jwtUser as any
        const { accessToken, refreshToken, user } = hack
        return {
          ...user,
          accessToken,
          refreshToken,
        }
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions)
