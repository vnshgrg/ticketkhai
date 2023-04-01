import Head from "next/head"
import { Layout } from "@/src/components"

import { siteConfig } from "@/src/config/site"

const AdminPage = () => {
  return (
    <Layout>
      <Head>
        <title>Admin - {siteConfig.name}</title>
      </Head>
      <h1>Admin Page</h1>
    </Layout>
  )
}
export default AdminPage
