import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[700px] mx-auto flex-col items-start gap-3 md:gap-4">
          <h1 className="text-lg text-center font-bold tracking-tighter text-slate-800 dark:text-slate-200 sm:text-xl md:text-2xl lg:text-2xl">
            特定商取引法に基づく表記
          </h1>
          <p className="max-w-[700px] text-base text-slate-700 dark:text-slate-400 sm:text-base">
            Commercial Disclosure
          </p>
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
          <DL label="運営統括責任者 (Head of Operations)">
            ソミタ　シュレスト(Somita Shrestha)
          </DL>
          <DL label="商品代金以外の必要料金 (Additional fees)">
            すべての税金と手数料は価格に含まれています。
            <br />
            コンビニ決済は店舗によりコンビニ手数料がかかります。
            <br />
            銀行によっては振込手数料がかかる場合があります。
            <br />
            All the tax and handling fees are included in the price.
            <br />
            Convenience store payment will incur a convenience store fee
            depending on the store.
            <br />
            Bank transfer fee may incur depending upon the bank.
          </DL>
          <DL label="返品 (Exchanges & Return)">
            当サイトで販売する商品の性質上、1回限りのイベント参加券となります。
            一度ご購入いただいた商品は、返品や第三者への転売はできません。
            <br />
            The nature of the products sold in our site are for one time use
            event entry tickets. Once purchased it can not be returned or resold
            to any third-party.
          </DL>
          <DL label="引き渡し時期 (Delivery times)">
            支払いが処理されると、対応する QR
            コードを含む電子チケットが生成され、すぐに「マイ
            ページ」に保存されます。
            <br />
            Immediately. Once the payment is processed the e-ticket with
            corresponding QR Codes will be generated and stored in your
            &lsquo;My Page&rsquo; immediately.
          </DL>
          <DL label="お支払方法 (Accepted payment methods)">
            クレジットカード、銀行振込、コンビニ払い。
            <br />
            Credit Cards, Bank Transfer and Convenience store
          </DL>
          <DL label="Payment period">
            <p>
              ・クレジットカード：決済時（クレジットカード会社ごとに異なります）
              <br />
              Credit card payments are processed depending upon credit card
              companies
            </p>
            <p>
              ・銀行振込：ご注文後7日以内
              <br />
              Bank transfer must be completed within 7 days of the date of order
            </p>
            <p>
              ・コンビニエンスストア：ご注文後3日以内
              <br />
              Convenience store payment must be completed within 3 days of the
              date of order
            </p>
          </DL>
          <DL label="Price">
            ￥3,500 for early birds tickets
            <br />
            ￥4,500 for standard tickets
            <br />
            ￥10,000 for VIP tickets
            <br />
            <span className="italic">
              ※すべてのチケットタイプは空き状況に応じて、先着順で販売されます。
              <br />
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
