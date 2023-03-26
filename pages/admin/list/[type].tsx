import Head from "next/head"
import { useRouter } from "next/router"
import { Layout } from "@/src/components"

const AdminPage = () => {
  const router = useRouter()

  const { type } = router.query

  return (
    <Layout>
      <Head>
        <title>List - Japan Recruitment Group</title>
      </Head>
      <h1>List {type}</h1>
    </Layout>
  )
}
export default AdminPage
