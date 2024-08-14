export const FB_PIXEL_ID = "463755453056938"

export const pixel = {
  pageview: () => {
    window.fbq("track", "PageView")
  },
  event: (
    name:
      | "ViewContent"
      | "AddToCart"
      | "Purchase"
      | "Lead"
      | "InitiateCheckout",
    options: Product | any = {}
  ) => {
    window.fbq("track", name, options)
  },
}

type ContentType = "product"

type Product = {
  content_name?: string
  content_category?: string
  content_ids?: string[]
  content_type?: ContentType
  value?: number
  currency?: string
}
