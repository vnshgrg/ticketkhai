import { NextApiRequest } from "next"

export const webhookPayloadParser = (req: NextApiRequest): Promise<string> =>
  new Promise((resolve) => {
    let data = ""
    req.on("data", (chunk) => {
      data += chunk
    })
    req.on("end", () => {
      resolve(Buffer.from(data).toString())
    })
  })
