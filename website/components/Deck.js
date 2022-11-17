import { useState } from "react"
import useSWR from "swr"
import { Feedback } from "./Feedback"
import { Flashcard } from "./Flashcard"
import { ContextDisplay } from "./ContextDisplay"


const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data)
    }

    return data
}

export default function Deck({ promptsToReview }) {
    const [current, setCurrent] = useState([0, promptsToReview[0]])

    function updateCurrent() {
        if (current[0] + 1 < promptsToReview.length) {
            setCurrent([current[0] + 1, promptsToReview[current[0] + 1]])
        } else {
            setCurrent([])
        }
    }

    const { data, error } = useSWR(
        () => current[1] && `/api/prompts/${current[1]}`,
        fetcher
    )

    if (!current[1]) return <div>All reviewed, check back later!</div>
    if (error) return <div>{error.message}</div>
    if (!data) return <div>Retrieving data...</div>



    return (
        <>
            <div className="review-item">
                <div className="topbar">
                    <ContextDisplay promptID={current[1]}></ContextDisplay>
                    <div className="topbar-status">{current[0] + 1}/{promptsToReview.length}</div>
                </div>
                <br />
                <Flashcard front={data.question} back={data.answer}></Flashcard>
                <Feedback promptID={current[1]} onFeedback={updateCurrent}></Feedback>
            </div>
        </>
    )
}