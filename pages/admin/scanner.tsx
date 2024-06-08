import Head from "next/head"
import { Layout, Scanner, Seo } from "@/src/components"

import { siteConfig } from "@/src/config/site"

const AdminPage = () => {
  return (
    <Layout>
      <Seo title="Scanner" />
      <div className="mt-8 w-full">
        <div className="mx-auto max-w-7xl">
          <Scanner />
        </div>
      </div>
    </Layout>
  )
}
export default AdminPage
