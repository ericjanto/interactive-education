import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"
import { Flashcard } from "../../components/Flashcard"
import { Feedback } from "../../components/Feedback"
import { Login } from "../../components/Login"


const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data)
    }

    return data
}

export default function Embed() {
    const { query } = useRouter()

    // TODO: can you show error message if not embedded but called as parent window?
    if (!query.prompts) {
        return <div>Loading query prompts...</div>
    }

    // {prompt id: {front, back}}
    var promptContents = {}
    query.prompts.map(item => {
        const { data, error } = useSWR(
            () => `/api/prompts/${item}`,
            fetcher
        )

        if (data) {
            promptContents[data.id] = { question: data.question, answer: data.answer }
        }
    })

    if (!promptContents) {
        return <div>Retrieving prompt contents...</div>
    }

    const [contactAddress, setContactAddress] = useState()
    const [visiblePrompt, setVisiblePrompt] = useState()

    if (typeof window !== "undefined") {
        window.addEventListener("message", (event) => {
            const recPayload = event.data
            console.log('received payload: ', recPayload)
            // only update if these values differ from current state
            if (recPayload.contact != contactAddress) {
                setContactAddress(recPayload.contact)
            }

            if (recPayload.promptID != visiblePrompt) {
                setVisiblePrompt(recPayload.promptID)
            }
        }, false)
    }

    let visibleFlashcard
    let visibleFeedback
    if (visiblePrompt && visiblePrompt in promptContents) {
        visibleFlashcard = <Flashcard front={promptContents[visiblePrompt].question} back={promptContents[visiblePrompt].answer}></Flashcard>
        visibleFeedback = <Feedback promptID={visiblePrompt}></Feedback>
    } else {
        visibleFlashcard = null
        visibleFeedback = null
    }

    return (
        <>
            <Login></Login>
            {visiblePrompt in promptContents ? (
                <>
                    <Flashcard front={promptContents[visiblePrompt].question} back={promptContents[visiblePrompt].answer}></Flashcard>
                    <Feedback promptID={visiblePrompt} resetPrompt={setVisiblePrompt}></Feedback>
                </>
            )
                :
                (
                    <div>Watch video</div>

                )

            }
        </>
    )
}