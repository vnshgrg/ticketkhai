import Head from "next/head"
import { useRouter } from "next/router"
import { Info, Input, Layout } from "@/src/components"
import { useForgotPassword } from "@/src/hooks/useForgotPassword"
import { getServerSession } from "next-auth/next"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/src/config/site"
import { Button } from "@/src/components/ui/button"
import { authOptions } from "../api/auth/[...nextauth]"

const ForgotPasswordPage = () => {
  const { register, errors, handleSubmit, onSubmit, loading } =
    useForgotPassword()
  const router = useRouter()
  const { error, info } = router.query

  const { t } = useTranslation("common")

  return (
    <Layout>
      <Head>
        <title>{`${t("auth-forgot-password")} - ${siteConfig.name}`}</title>
      </Head>
      <section className="flex flex-1 flex-col items-center justify-center space-y-6 bg-slate-50  dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="w-full px-4 sm:mx-auto sm:max-w-md sm:px-0">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            {t("auth-forgot-password")}
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
                  label={{ label: t("auth-mobile"), for: "username" }}
                  error={errors.username?.message as string}
                  aria-invalid={errors.username ? true : false}
                  disabled={loading}
                  {...register("username")}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  width="full"
                  variant="default"
                  disabled={loading}
                >
                  {t("auth-forgot-password-send-verification-code")}
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  width="full"
                  variant="subtle"
                  disabled={loading}
                >
                  {t("auth-login")}
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

export default ForgotPasswordPage
