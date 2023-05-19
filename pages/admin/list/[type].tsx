import Head from "next/head"
import { useRouter } from "next/router"
import { Layout } from "@/src/components"

import { siteConfig } from "@/src/config/site"

const AdminPage = () => {
  const router = useRouter()

  const { type } = router.query

  return (
    <Layout>
      <Head>
        <title>List - {siteConfig.name}</title>
      </Head>
      <h1>List {type}</h1>
    </Layout>
  )
}
export default AdminPage
