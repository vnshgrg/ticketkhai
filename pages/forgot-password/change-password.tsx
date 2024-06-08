import Head from "next/head"
import { useRouter } from "next/router"
import { Info, Input, Layout } from "@/src/components"
import { useChangeForgottenPassword } from "@/src/hooks/useChangeForgottenPassword"
import { getServerSession } from "next-auth/next"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/src/config/site"
import { Button } from "@/src/components/ui/button"
import { authOptions } from "../api/auth/[...nextauth]"

const ChangePasswordPage = ({ identifier }) => {
  const { register, errors, handleSubmit, onSubmit, loading } =
    useChangeForgottenPassword(identifier)
  const router = useRouter()
  const { error, info } = router.query

  const { t } = useTranslation("common")

  console.log(identifier)

  return (
    <Layout>
      <Head>
        <title>{`Change password - ${siteConfig.name}`}</title>
      </Head>
      <section className="flex flex-1 flex-col items-center justify-center space-y-6 bg-slate-50  dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            Change password
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
                  name="token"
                  id="token"
                  label={{ label: "Code", for: "token" }}
                  error={errors.token?.message as string}
                  aria-invalid={errors.token ? true : false}
                  disabled={loading}
                  {...register("token")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  label={{ label: t("auth-password"), for: "password" }}
                  error={errors.password?.message as string}
                  aria-invalid={errors.password ? true : false}
                  disabled={loading}
                  {...register("password")}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  width="full"
                  variant="default"
                  disabled={loading}
                >
                  Change password
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
  const { identifier } = context.query
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
      identifier,
    },
  }
}

export default ChangePasswordPage
