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
    const [promptQueue, setPromptQueue] = useState(promptsToReview)
    // const [current, setCurrent] = useState(promptsToReview[0])

    var promptContents = {}
    promptsToReview.map(item => {
        const { data, error } = useSWR(
            () => `/api/prompts/${item}`,
            fetcher
        )

        if (data) {
            promptContents[data.id] = { question: data.question, answer: data.answer }
        }
    })

    const [showQuestion, setShowQuestion] = useState(true)

    function updateQueue(remembered) {
        if (remembered) {
            setPromptQueue(promptQueue.slice(1))
        } else {
            const [first, ...rest] = promptQueue
            setPromptQueue([...rest, first])
        }
        setShowQuestion(true)
    }

    if (promptQueue.length == 0) return <div>All reviewed, check back later!</div>
    if (!promptContents) {
        return <div>Retrieving prompt contents...</div>
    }

    const visiblePrompt = promptQueue[0]

    return (
        <>
            <div className="review-item">
                <div className="topbar">
                    <ContextDisplay promptID={visiblePrompt}></ContextDisplay>
                    <div className="topbar-status">{promptQueue.length} left</div>
                </div>
                <br />
                {visiblePrompt in promptContents ? (
                    <>
                        <Flashcard front={promptContents[visiblePrompt].question} back={promptContents[visiblePrompt].answer} showQuestion={showQuestion} setShowQuestion={setShowQuestion}></Flashcard>
                        <Feedback promptID={visiblePrompt} onFeedback={updateQueue}></Feedback>
                    </>
                )
                    : (
                        <div className="placeholder">
                        </div>
                    )
                }
            </div>
        </>
    )
}