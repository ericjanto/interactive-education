import { fetchMultiplePrompts } from "../../../utils/firebase"

export default async function handler(req, res) {
  const { promptIDs } = req.query
  const { method } = req
  
  switch (method) {
    case 'GET':
      const result = await fetchMultiplePrompts(promptIDs)
      console.log(result)
      res.status(200).json(result)
      break
    case 'PUT':
      res.status(404).json('Bulk prompt creation via API endpoint not implemented yet')
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} not allowed`)
  }
}