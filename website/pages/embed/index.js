import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"
import Image from 'next/image'

import ReviewItem from "../../components/ReviewItem"


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

function getQueryrank(promptID, queryPrompts) {
    return queryPrompts.indexOf(promptID) + 1
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
            setQueryRank(getQueryrank(recPayload.promptID, query.prompts))
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

    const [queryRank, setQueryRank] = useState(0)
    const totalPrompts = Object.keys(promptContents).length

    return (
        <>
            {visiblePrompt in promptContents ? (
                <>
                    <ReviewItem promptID={visiblePrompt}
                        front={promptContents[visiblePrompt].question}
                        back={promptContents[visiblePrompt].answer}
                        n={queryRank}
                        total={totalPrompts}
                        onFeedback={onFeedback}></ReviewItem>
                </>
            )
                :
                (
                    <div className="placeholder">
                        <div className='topbar'>
                            <div className="topbar-info information">
                                {queryRank < totalPrompts || totalPrompts == 0
                                    ?
                                    'Watch the video to activate questions.'
                                    :
                                    'All questions answered.'}
                            </div>
                            <div className="topbar-status">
                                {queryRank}/{totalPrompts}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}