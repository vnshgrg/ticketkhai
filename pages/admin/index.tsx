import Head from "next/head"
import { Layout, Seo } from "@/src/components"

import { siteConfig } from "@/src/config/site"

const AdminPage = () => {
  return (
    <Layout>
      <Seo title="Admin" />
      <h1>Admin Page</h1>
    </Layout>
  )
}
export default AdminPage
