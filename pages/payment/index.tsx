import Link from "next/link"
import { useRouter } from "next/router"
import { EventList, Seo } from "@/src/components"
import moment from "moment"
import { getServerSession } from "next-auth/next"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { authOptions } from "../api/auth/[...nextauth]"

export default function IndexPage(props) {
  const { result } = props
  const router = useRouter()
  const { t } = useTranslation("common")

  const title =
    result === "success" ? t("purchase-successful") : t("purchase-fail")

  return (
    <Layout>
      <Seo title={title} />
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="text-center">
          {result === "success" ? (
            <div className="space-y-4">
              <h3 className="text-2xl text-slate-700">{title}</h3>
              <p>{t("purchase-successful-message")}</p>
              <p>
                <Button
                  variant="subtle"
                  onClick={() => {
                    router.push("/user/my-tickets")
                  }}
                >
                  {t("purchase-view-ticket")}
                </Button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl text-red-600">{title}</h3>
              <p>{t("purchase-fail-message")}</p>
              <p>
                <Button
                  variant="subtle"
                  onClick={() => {
                    router.push("/")
                  }}
                >
                  {t("go-home")}
                </Button>
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions)
  const { result } = query
  return {
    props: { sessionData: session, result }, // will be passed to the page component as props
  }
}
