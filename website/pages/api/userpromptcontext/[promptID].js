import { getNormalisedUserID } from '../../../utils/lib'
import { createPromptContext, fetchSameContext, fetchUserSpecificPromptContexts } from '../../../utils/firebase'
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

export function handler(req, res) {
    const {
        method,
        body,
        query: { promptID },
    } = req

    const { user } = getSession(req, res);
    const normUserID = getNormalisedUserID(user.sub)

    switch (method) {
        case 'GET':
            const dbRes = fetchUserSpecificPromptContexts(normUserID, promptID)
            dbRes.then(
                (result) => {
                    res.status(200).json(result)
                },
                (error) => {
                    res.status(404).json(`Context for prompt with id ${promptID} and user ${normUserID} not found. ${error}`)
                })
            break
        case 'POST':
            const contextLink = body.contextLink
            const linkName = body.linkName
            // Only POSTs when record not already exists. TODO: let this be managed by the database
            const dbRes2 = fetchSameContext(normUserID, promptID, contextLink)
            dbRes2.then(
                (result) => {
                    // res.status(409).json(`This record already exists. Preventing POST to avoid conflict.`)
                    if (result.length == 0) {
                        createPromptContext(normUserID, promptID, contextLink, linkName)
                        res.status(200).json(`Context record successfully created.`)
                    } else {
                        res.status(409).json(`Context record already present, aborted POST to prevent conflict.`)
                    }
                },
                (error) => {
                    res.status(404).json(`No data found for user with ID ${normUserID}, prompt ${promptID} and context link ${contextLink}. Therefore creating new link. ${error}`)
                }
            )
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} not allowed`)
    }
}

export default withApiAuthRequired(handler)