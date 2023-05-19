import Head from "next/head"
import { useRouter } from "next/router"
import { AuthErrorTypes, Info } from "@/src/components"
import { useRegistration } from "@/src/hooks/useRegister"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/src/config/site"
import { Input } from "@/src/components/form"
import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { authOptions } from "../api/auth/[...nextauth]"

export default function RegisterPage() {
  const { register, errors, handleSubmit, onSubmit, loading, apiError } =
    useRegistration()
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Register - {siteConfig.name}</title>
      </Head>
      <section className="flex flex-1 flex-col items-center justify-center space-y-6 bg-slate-50  dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            Register an account
          </h2>
        </div>

        {apiError && (
          <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
            <Info error={apiError as AuthErrorTypes} />
          </div>
        )}

        <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
          <div className="rounded border-2 border-slate-100 bg-white py-8 px-4 shadow-2xl shadow-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-800 sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  label={{ label: "Name", for: "name" }}
                  error={errors.name?.message as string}
                  aria-invalid={errors.name ? true : false}
                  disabled={loading}
                  {...register("name")}
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
              <div>
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
              <div>
                <Button
                  type="button"
                  className={buttonVariants({
                    variant: "subtle",
                    width: "full",
                  })}
                  disabled={loading}
                  onClick={() => {
                    router.push("/login")
                  }}
                >
                  Login
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
