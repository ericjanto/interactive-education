import { fetchPrompt } from "../../../utils/pocketbase"

export default function handler(req, res) {
    const {
        query: { promptID },
        method,
    } = req

    switch (method) {
        case 'GET':
            const dbRes = fetchPrompt(promptID)
            dbRes.then(
                (result) => {
                    res.status(200).json(result)
                },
                (error) => {
                    res.status(404).json(`Prompt with id ${promptID} not found.`)
                })
            break
        case 'PUT':
            console.log('Prompt creation via API endpoint not implemented yet!')
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} not allowed`)
    }
}