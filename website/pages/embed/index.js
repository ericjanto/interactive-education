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

function communicateToWebcomponent(origin, sessionID, videoTimeStamp) {
    const payload = {
        continueVideo: true,
        sessionID: sessionID,
        timeStamp: videoTimeStamp
    }
    window.parent.postMessage(payload, origin)
}

export default function Embed() {
    const { query } = useRouter()

    // TODO: can you show error message if not embedded but called as parent window?
    if (!query.prompts) {
        return <div>Please provide valid query prompts in the URL</div>
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


    const [contactAddress, setContactAddress] = useState()
    const [visiblePrompt, setVisiblePrompt] = useState()
    const [sessionID, setSessionID] = useState()
    const [videoTimeStamp, setTimeStamp] = useState()

    if (typeof window !== "undefined") {
        window.addEventListener("message", (event) => {
            const recPayload = event.data
            // console.log('received payload: ', recPayload)
            setContactAddress(recPayload.contact)
            setSessionID(recPayload.sessionID)
            setVisiblePrompt(recPayload.promptID)
            setTimeStamp(recPayload.timeStamp)
        }, false)
    }

    if (!promptContents) {
        return <div>Retrieving prompt contents...</div>
    }

    function onFeedback() {
        communicateToWebcomponent(contactAddress, sessionID, videoTimeStamp)
        setVisiblePrompt(null)
    }

    return (
        <>
            <Login></Login>
            {visiblePrompt in promptContents ? (
                <>
                    <Flashcard front={promptContents[visiblePrompt].question} back={promptContents[visiblePrompt].answer}></Flashcard>
                    <Feedback promptID={visiblePrompt} onFeedback={onFeedback}></Feedback>
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