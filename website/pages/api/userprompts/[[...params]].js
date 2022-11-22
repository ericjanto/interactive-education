import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { createUserPromptReview, fetchPrompt, fetchUserPromptsReviews, fetchUserSpecificPromptReviews } from "../../../utils/firebase";
import { addDays, daysBetweenDates, getNormalisedUserID } from "../../../utils/lib"
import { leitnerSchedule } from "../../../utils/scheduler";

function handler(req, res) {
    const {
        method,
        body,
    } = req

    const { user } = getSession(req, res);
    const normUserID = getNormalisedUserID(user.sub)

    switch (method) {
        case 'GET':
            const dbRes = fetchUserPromptsReviews(normUserID)
            dbRes.then(
                (result) => {
                    res.status(200).json(result)
                },
                (error) => {
                    res.status(404).json(`No data found for user with ID ${normUserID}. ${error}`)
                })
            break
        case 'POST':
            const promptID = body.promptID
            const remembered = body.remembered
            fetchUserSpecificPromptReviews(normUserID, promptID).then(
                (result) => {
                    var sendFeedback = true
                    if (result.length >= 1) {
                        const due_date = new Date(result[0].calculatedNextDue.toDate())
                        const now = new Date()
                        const daydiff = daysBetweenDates(now, due_date)
                        if (daydiff > 0) {
                            sendFeedback = false
                            res.status(409).json(`Did not send feedback since review date is scheduled in future: ${due_date}`)
                        }
                    }
                    if (sendFeedback) {
                        var nextDueDate = null
                        if (remembered) {
                            nextDueDate = leitnerSchedule(result)
                        } else {
                            nextDueDate = addDays(new Date(), 0)
                        }
                        createUserPromptReview(normUserID, promptID, remembered, nextDueDate)
                        res.status(200).json(`Created prompt review record with user id ${normUserID} and prompt id ${promptID}. Next due date: ${nextDueDate}`)
                    }
                },
                (error) => {
                    res.status(404).json(`No data found for user with ID ${normUserID}. ${error}`)
            })
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} not allowed`)
    }
}

export default withApiAuthRequired(handler)