import { createUserPromptReview, fetchPrompt, fetchUserPrompts } from "../../../utils/pocketbase"
import { getNormalisedUserID } from "../../../utils/lib"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

export default withApiAuthRequired(function UserDataEndpoints(req, res) {
    const {
        // TODO: process additional parameters (for now, prompt id, but 
        // later also date)
        query: { userID },
        method,
    } = req
    const query = req.query

    const { user } = getSession(req, res);

    const normUserID = getNormalisedUserID(userID)

    if (normUserID != getNormalisedUserID(user.sub)) {
        res.status(401).json(`Unauthorised to use this API endpoint for other
            user than oneself. You are: ${user.sub}. You want to use this endpoint as: ${userID}`)
    }

    switch (method) {
        case 'GET':
            const dbRes = fetchUserPrompts(normUserID)
            dbRes.then(
                (result) => {
                    res.status(200).json(result)
                },
                (error) => {
                    res.status(404).json(`No data found for user with ID ${userID}. ${error}`)
                })
            break
        case 'PUT':
            const prompt_id = query.prompt_id
            if (prompt_id) {
                // Make sure that prompt actually exists.
                // Will potentially move this to the DB level
                // by using relations
                if (fetchPrompt(prompt_id)) {
                    createUserPromptReview(normUserID, prompt_id)
                    res.status(200).json(`Created prompt review record with user id ${query.userID} and prompt id ${prompt_id}`)
                }
            }
            res.status(404).json(`Not implemented yet`)
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
})