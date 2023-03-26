import Head from "next/head"
import { AuthErrorTypes, Info } from "@/src/components"
import { useRegistration } from "@/src/hooks/useRegister"
import { getServerSession } from "next-auth/next"

import { Input } from "@/src/components/form"
import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { authOptions } from "../api/auth/[...nextauth]"

export default function RegisterPage() {
  const { register, errors, handleSubmit, onSubmit, loading, apiError } =
    useRegistration()

  return (
    <Layout>
      <Head>
        <title>Register - Japan Recruitment Group</title>
        <meta name="description" content="Japan Recruitment Group" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900  sm:px-6 lg:px-8 space-y-6">
        <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            Register an account
          </h2>
        </div>

        {apiError && (
          <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md">
            <Info error={apiError as AuthErrorTypes} />
          </div>
        )}

        <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md">
          <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-2xl shadow-slate-200 dark:shadow-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  label={{ label: "Last name", for: "lastname" }}
                  error={errors.lastName?.message as string}
                  aria-invalid={errors.lastName ? true : false}
                  disabled={loading}
                  {...register("lastName")}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  label={{ label: "First name", for: "firstname" }}
                  error={errors.firstName?.message as string}
                  aria-invalid={errors.firstName ? true : false}
                  disabled={loading}
                  {...register("firstName")}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastnamekana"
                  id="lastnamekana"
                  label={{ label: "Last name kana", for: "lastnamekana" }}
                  error={errors.lastNameKana?.message as string}
                  aria-invalid={errors.lastNameKana ? true : false}
                  disabled={loading}
                  {...register("lastNameKana")}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="firstnamekana"
                  id="firstnamekana"
                  label={{ label: "First name kana", for: "firstnamekana" }}
                  error={errors.firstNameKana?.message as string}
                  aria-invalid={errors.firstNameKana ? true : false}
                  disabled={loading}
                  {...register("firstNameKana")}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="080-1234-5678"
                  label={{ label: "Mobile", for: "mobile" }}
                  error={errors.mobile?.message as string}
                  aria-invalid={errors.mobile ? true : false}
                  supportingText="A Japanese mobile number."
                  disabled={loading}
                  {...register("mobile")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  label={{ label: "Create a password", for: "password" }}
                  error={errors.password?.message as string}
                  aria-invalid={errors.password ? true : false}
                  disabled={loading}
                  {...register("password")}
                />
              </div>
              <Separator />
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className={buttonVariants({
                    variant: "primary",
                    width: "full",
                  })}
                  disabled={loading}
                >
                  Register
                </Button>
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
