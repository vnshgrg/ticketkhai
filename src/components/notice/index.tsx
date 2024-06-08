import { MegaphoneIcon } from "@heroicons/react/24/outline"

export const Notice = ({ notices }: { notices: string[] }) => {
  if (notices.length === 0) return null
  return (
    <div className={styles.noticeContainer}>
      {notices.map((notice, index) => (
        <div key={index} className={styles.noticeItem}>
          <MegaphoneIcon className="w-5 h-5 mt-0.5 mr-3 shrink-0" /> {notice}
        </div>
      ))}
    </div>
  )
}

const styles = {
  noticeContainer:
    "divide-y divide-red-600 rounded-lg text-red-50 bg-red-700 text-sm shadow-md shadow-red-300",
  noticeItem: "flex items-start text-base text-red-100 px-4 py-3",
}
