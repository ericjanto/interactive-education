import { useState } from "react"
import useSWR from "swr"
import { Flashcard } from "./Flashcard"
import { SimpleFeedback } from "./SimpleFeedback"


const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data)
    }

    return data
}

export default function Deck({ promptsToReview }) {
    const [reviewQueue, setReviewQueue] = useState(["ru7c3q3uox0y9rb", "ru7c3q3uox0y9rb", "ru7c3q3uox0y9rb"])

    const current = reviewQueue[0]
    const { data, error } = useSWR(
        () => current && `/api/prompts/${current}`,
        fetcher
    )

    if (error) return <div>{error.message}</div>
    if (!data) return <div>All reviewed...</div>

    return (
        <>
            <div>Flashcard deck. Left to review: {reviewQueue.length}</div>
            <br />
            <Flashcard front={data.question} back={data.answer}></Flashcard>
            <SimpleFeedback promptID={current} reviewQueue={reviewQueue} setReviewQueue={setReviewQueue}></SimpleFeedback>
        </>
    )
}