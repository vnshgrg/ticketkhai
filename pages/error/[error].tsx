import { GetServerSideProps } from "next"
import Head from "next/head"
import { Layout } from "@/src/components"

import { siteConfig } from "@/src/config/site"

export type PageErrorTypes = "unauthorized" | "404"

export interface ErrorPageProps {
  error: PageErrorTypes
}

const ErrorPage = ({ error }) => {
  let errorMessage: string

  switch (error) {
    case "unauthorized":
      errorMessage = "You are not authorized to view this page."
      break
    case "404":
      errorMessage = "Not found."
      break
    default:
      errorMessage = "An error occurred. Please try again later."
      break
  }

  return (
    <Layout>
      <Head>
        <title>Error - {siteConfig.name}</title>
      </Head>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1>{errorMessage}</h1>
      </div>
    </Layout>
  )
}
export default ErrorPage

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async (
  context
) => {
  const { error } = context.query
  return {
    props: {
      error: error as PageErrorTypes,
    },
  }
}
