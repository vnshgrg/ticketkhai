import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { FB_PIXEL_ID, pixel } from "@/src/utils"

export const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!loaded) return

    pixel.pageview()
  }, [pathname, loaded])

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="beforeInactive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={FB_PIXEL_ID}
      />
    </div>
  )
}
