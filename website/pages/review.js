import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState } from 'react'
import Deck from '../components/Deck'

import { getDueReviewPrompts, getNormalisedUserID } from '../utils/lib'
import { fetchUserPromptsReviews } from '../utils/firebase'

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data)
    }

    return data
}

export default function Review({ user }) {
    const [promptsToReview, setPromptsToReview] = useState()
    const [fetched, setFetched] = useState(false)

    // TODO: this only shows 50 reviews at most
    // TODO: useSWR
    if (!fetched) {
        const dbRes = fetchUserPromptsReviews(getNormalisedUserID(user.sub))
        dbRes.then(
            (result) => {
                setPromptsToReview(getDueReviewPrompts(result))
                setFetched(true)
            })
    }

    return (
        <>
            <h1>Review page</h1>
            <p>
                This is the review page where you can review flashcards that you have previously encountered in
                lectures. Our spacing algorithm calculates when it&apos;s the best time for you to review a specific flashcard.
            </p>
            {promptsToReview ? <Deck promptsToReview={promptsToReview}></Deck> : "Checking prompts to review..."}
        </>
    )
}

export const getServerSideProps = withPageAuthRequired()