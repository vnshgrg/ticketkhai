import Head from "next/head"
import { AuthErrorTypes, Info, Input, Layout } from "@/src/components"
import { useVerify } from "@/src/hooks"

import { siteConfig } from "@/src/config/site"

const VerifyPage = ({ data }) => {
  const { type, identifier, token, key } = data
  const { register, errors, handleSubmit, onSubmit, loading, apiError } =
    useVerify({
      type,
      defaultValues: {
        mobile: identifier,
        code: token,
      },
    })

  return (
    <Layout>
      <Head>
        <title>Verify - {siteConfig.name}</title>
      </Head>
      <section className="flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900  sm:px-6 lg:px-8 space-y-6">
        <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            Verify phone
          </h2>
        </div>

        {apiError && (
          <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md">
            <Info error={apiError as AuthErrorTypes} />
          </div>
        )}

        <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md">
          <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-2xl shadow-slate-200 dark:shadow-slate-800 border-2 border-slate-100 dark:border-slate-800 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  label={{ label: "Mobile", for: "mobile" }}
                  error={errors.mobile?.message as string}
                  aria-invalid={errors.mobile ? true : false}
                  disabled={loading || identifier.length > 0}
                  {...register("mobile")}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="code"
                  id="code"
                  label={{ label: "code", for: "code" }}
                  error={errors.code?.message as string}
                  aria-invalid={errors.code ? true : false}
                  disabled={loading}
                  {...register("code")}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Verify
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
  const { type, identifier, token, key } = context.query
  return {
    props: {
      data: {
        type: type || null,
        identifier: identifier || null,
        token: token || null,
        key: key || null,
      },
    },
  }
}

export default VerifyPage
