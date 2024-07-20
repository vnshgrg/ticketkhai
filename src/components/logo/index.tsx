import Link from "next/link"

export const TicketKhaiLogo = ({
  enabled = true,
  href = "/",
  className,
}: {
  className?: string
  enabled?: boolean
  href?: string
}) => {
  const logo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 302.91 56.69"
      className={`h-6 ${className}`}
    >
      <path d="M0 51.63V5.06C0 2.27 2.27 0 5.06 0h8.17c.72 0 1.39.39 1.75 1.01 1.08 1.87 3.1 3.04 5.26 3.04s4.18-1.16 5.26-3.04C25.86.38 26.53 0 27.25 0h8.17c2.79 0 5.06 2.27 5.06 5.06v46.57c0 2.79-2.27 5.06-5.06 5.06h-8.17c-.72 0-1.39-.39-1.75-1.01-1.08-1.87-3.1-3.04-5.26-3.04s-4.18 1.16-5.26 3.04c-.36.63-1.03 1.01-1.75 1.01H5.06C2.27 56.69 0 54.42 0 51.63Zm4.05-9.11v9.11c0 .56.45 1.01 1.01 1.01h7.09c1.9-2.52 4.9-4.05 8.1-4.05s6.2 1.53 8.1 4.05h7.09c.56 0 1.01-.45 1.01-1.01v-9.11h-2.02c-1.12 0-2.02-.91-2.02-2.02s.91-2.02 2.02-2.02h2.02V5.06c0-.56-.45-1.01-1.01-1.01h-7.09c-1.9 2.52-4.9 4.05-8.1 4.05s-6.2-1.53-8.1-4.05H5.06c-.56 0-1.01.45-1.01 1.01v33.41h2.02c1.12 0 2.02.91 2.02 2.02s-.91 2.02-2.02 2.02H4.05Zm23.21 12.15ZM10.12 24.3v-8.1c0-1.12.91-2.02 2.02-2.02s2.02.91 2.02 2.02v8.1c0 1.12-.91 2.02-2.02 2.02s-2.02-.91-2.02-2.02Zm2.03 16.19c0-1.12.91-2.02 2.02-2.02h2.02c1.12 0 2.02.91 2.02 2.02s-.91 2.02-2.02 2.02h-2.02c-1.12 0-2.02-.91-2.02-2.02Zm4.05-10.12V16.2c0-1.12.91-2.02 2.02-2.02s2.02.91 2.02 2.02v14.17c0 1.12-.91 2.02-2.02 2.02s-2.02-.91-2.02-2.02Zm6.07 10.12c0-1.12.91-2.02 2.02-2.02h2.02c1.12 0 2.02.91 2.02 2.02s-.91 2.02-2.02 2.02h-2.02c-1.12 0-2.02-.91-2.02-2.02Z" />
      <path d="M72.99 42.93v6.96h-6.54c-6.42 0-9.12-3-9.12-10.2v-14.4h-4.56v-6.72h4.74l.48-7.8h8.22v7.8h6.48v6.72h-6.48v13.86c0 2.94.72 3.78 3.3 3.78h3.48ZM75.45 6.57h9.36v7.56h-9.36V6.57Zm.24 12h8.88v31.32h-8.88V18.57ZM89.01 37.29v-6.12c0-8.82 4.62-13.32 13.68-13.32s13.26 4.14 13.38 12.66h-8.46c-.18-3.6-1.44-5.46-4.8-5.46s-4.92 1.86-4.92 6.18v6.06c0 4.26 1.56 6.12 4.92 6.12s4.68-1.86 4.8-5.46h8.46c-.12 8.52-4.62 12.66-13.38 12.66s-13.68-4.5-13.68-13.32ZM131.91 37.77l-3.42 4.02v8.1h-8.88V6.09h8.88v24.72l10.32-12.24h10.38l-10.98 12.78 11.16 18.54h-10.32l-7.14-12.12Z" />
      <path d="M157.59 37.59c0 4.08 1.62 6.06 5.46 6.06 3 0 4.74-1.2 4.92-3.36h8.46c-.36 6.78-4.98 10.32-13.44 10.32-9.48 0-14.28-4.5-14.28-13.32v-6.12c0-8.7 4.8-13.32 13.92-13.32s13.98 4.74 13.98 13.44v5.7h-19.02v.6Zm0-6.84h10.62c0-4.2-1.56-5.94-5.28-5.94s-5.34 1.74-5.34 5.94ZM197.73 42.93v6.96h-6.54c-6.42 0-9.12-3-9.12-10.2v-14.4h-4.56v-6.72h4.74l.48-7.8h8.22v7.8h6.48v6.72h-6.48v13.86c0 2.94.72 3.78 3.3 3.78h3.48ZM212.73 37.77l-3.42 4.02v8.1h-8.88V6.09h8.88v24.72l10.32-12.24h10.38l-10.98 12.78 11.16 18.54h-10.32l-7.14-12.12ZM258.03 29.13v20.76h-8.88V29.91c0-2.94-1.08-4.38-3.48-4.38s-4.2 1.38-5.52 4.14v20.22h-8.88V6.09h8.88v15c2.16-2.22 4.74-3.24 8.04-3.24 6.48 0 9.84 3.84 9.84 11.28ZM288.63 29.73v20.16h-7.5l-.3-3.9c-2.16 3.06-5.28 4.62-9.42 4.62-6.18 0-9.9-3.48-9.9-9.72 0-6.6 4.14-10.26 12.48-10.26h5.76v-1.02c0-3.24-1.26-4.8-4.44-4.8s-4.26 1.38-4.38 3.54h-8.58c.48-6.96 4.68-10.5 13.32-10.5s12.96 3.72 12.96 11.88Zm-8.88 10.38v-3.6h-4.14c-4.02 0-5.34 1.38-5.34 3.66s1.32 3.48 3.84 3.48 4.38-1.2 5.64-3.54ZM293.55 6.57h9.36v7.56h-9.36V6.57Zm.24 12h8.88v31.32h-8.88V18.57Z" />
    </svg>
  )

  if (enabled) {
    return (
      <Link href={href} className="items-center space-x-2 flex">
        {logo}
      </Link>
    )
  }
  return logo
}
