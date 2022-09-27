// API endpoint for retrieving user-specific prompts,
// i.e. prompt they have encountered and answered
import { useUser } from '@auth0/nextjs-auth0'

// TODO: [userID].js

export default async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
        res.send({
            content:
                "This is user-specific content. Yet to be implemented, but here you should retrieve DB data."
        })
    } else {
        res.send({
            error: "You are not signed in, hence I can't retrieve user-specific content."
        })
    }
}