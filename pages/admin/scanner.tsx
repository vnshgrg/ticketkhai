import Head from "next/head"
import { Layout, Scanner } from "@/src/components"

import { siteConfig } from "@/src/config/site"

const AdminPage = () => {
  return (
    <Layout>
      <Head>
        <title>Admin - {siteConfig.name}</title>
      </Head>
      <div className="mt-8 w-full">
        <div className="mx-auto max-w-7xl">
          <Scanner />
        </div>
      </div>
    </Layout>
  )
}
export default AdminPage
