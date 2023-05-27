import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[980px] flex-col items-start gap-3 md:gap-4">
          <h1 className="text-lg font-bold tracking-tighter text-slate-800 dark:text-slate-200 sm:text-xl md:text-2xl lg:text-2xl">
            特定商取引法に基づく表記
          </h1>
          <p className="max-w-[700px] text-base text-slate-700 dark:text-slate-400 sm:text-base">
            Commercial Disclosure
          </p>
        </div>
        <div>
          <DL label="Legal Name">株式会社MOON SUN INTERNATIONAL</DL>
          <DL label="Address">
            〒272-0142 千葉県市川市欠真間1-14-8 フラワーヴェール102
          </DL>
          <DL label="Phone number">080-3557-3054</DL>
          <DL label="Email address">info@ticketkhai.com</DL>
          <DL label="Head of Operations">Somita Shrestha</DL>
          <DL label="Additional fees">
            None. All the tax and handling fees are included in the price.
          </DL>
          <DL label="Exchanges & Returns Policy">
            The nature of the products sold in our site are for one time use
            event entry tickets. Once purchased it can not be returned or resold
            to any third-party.
          </DL>
          <DL label="Delivery times">
            Immediately. Once the payment is processed the e-ticket with
            corresponding QR Codes will be generated and stored in your
            &lsquo;My Page&rsquo; immediately.
          </DL>
          <DL label="Accepted payment methods">Credit Cards and Konbini.</DL>
          <DL label="Payment period">
            Credit card payments are processed immediately, while konbini
            payment must be completed within 3 days of the date of order.
          </DL>
          <DL label="Price">
            ￥3,500 for early birds tickets
            <br />
            ￥4,500 for standard tickets
            <br />
            ￥10,000 for VIP tickets
            <br />
            <span className="italic">
              *All ticket types are subject to availability and sold in first
              come first served basis
            </span>
          </DL>
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
