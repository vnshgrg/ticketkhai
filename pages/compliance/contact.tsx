import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"

export default function Contact() {
  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[700px] mx-auto flex-col items-start gap-3 md:gap-4">
          <h1 className="text-lg text-center font-bold tracking-tighter text-slate-800 dark:text-slate-200 sm:text-xl md:text-2xl lg:text-2xl">
            お問い合わせ
          </h1>
        </div>
        <div className="max-w-[800px] mx-auto">
          <DL label="ショップ名 (Shop name)">チケットカイ　(TicketKhai)</DL>
          <DL label="販売業者 (Company name)">
            株式会社MOON SUN INTERNATIONAL
          </DL>
          <DL label="所在地 (Address)">
            〒272-0142 千葉県市川市欠真間1-14-8 フラワーヴェール102
          </DL>
          <DL label="電話番号 (Phone number)">047-709-5154</DL>
          <DL label="メールアドレス (Email address)">info@ticketkhai.com</DL>
        </div>
      </section>
    </Layout>
  )
}

const DL = ({ label, children }) => (
  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {children}
    </dd>
  </div>
)
