import Head from "next/head"
import { useRouter } from "next/router"
import { AuthErrorTypes, Info, Input, Layout } from "@/src/components"
import { useLogin } from "@/src/hooks"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/src/config/site"
import { authOptions } from "../api/auth/[...nextauth]"

const LoginPage = () => {
  const { register, errors, handleSubmit, onSubmit } = useLogin()
  const router = useRouter()
  const { error, info } = router.query

  console.log(error, info)

  return (
    <Layout>
      <Head>
        <title>Login - {siteConfig.name}</title>
      </Head>
      <section className="flex flex-1 flex-col items-center justify-center space-y-6 bg-slate-50  dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
            <Info error={error as string} />
          </div>
        )}
        {info && (
          <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
            <Info info={info as string} />
          </div>
        )}

        <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
          <div className="border-2 border-slate-100 bg-white py-8 px-4 shadow-2xl shadow-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-800 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  label={{ label: "Username", for: "username" }}
                  error={errors.username?.message as string}
                  aria-invalid={errors.username ? true : false}
                  {...register("username")}
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  label={{ label: "Password", for: "password" }}
                  error={errors.password?.message as string}
                  aria-invalid={errors.password ? true : false}
                  {...register("password")}
                />
              </div>

              <div className="flex flex-col items-center justify-between sm:flex-row">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-600 dark:border-slate-700 dark:bg-slate-600 dark:text-slate-700 dark:ring-slate-700"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-slate-800 dark:text-slate-400"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const { callbackUrl } = context.query
  if (session) {
    return {
      redirect: {
        destination: callbackUrl || "/",
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default LoginPage
