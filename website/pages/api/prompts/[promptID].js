import PocketBase from 'pocketbase'

async function fetchPrompt(promptID) {
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        return client.records.getOne('prompts', promptID, {
        })
    } catch (error) {
        console.log(error)
        return null
    }
}

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
                    res.status(404).json(`Record with id ${promptID} not found.`)
                })
            break
        case 'PUT':
            console.log('Prompt creation via API endpoint not implemented yet!')
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}