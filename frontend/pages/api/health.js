// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { warmUpCache } from '../../shared/misc/ssr-cache'

warmUpCache()

const handleEndpoint = (req, res) => {
  res.status(200).json(['ok'])
}

export default handleEndpoint
