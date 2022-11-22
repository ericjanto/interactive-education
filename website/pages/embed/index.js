import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"

import ReviewItem from "../../components/ReviewItem"
import { Topbar } from '../../components/Topbar'


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

function createContextLink(contactAddress, videoTimeStamp) {
    return `${contactAddress}?t=${videoTimeStamp}`
}


function saveContext(promptID, contactAddress, videoTimeStamp, contextName) {
    const url = `/api/userpromptcontext/${promptID}`
    const payload = {
        contextLink: createContextLink(contactAddress, videoTimeStamp),
        linkName: contextName,
    }
    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    }

    const response = fetch(url, options);
    response.then((r) => {
        r.json().then((res) => {
            console.log(res)
            // TODO: if unauthorised: user not logged in
        })
    })
}

export default function Embed() {
    const { query } = useRouter()

    const [contactAddress, setContactAddress] = useState()
    const [visiblePrompt, setVisiblePrompt] = useState()
    const [sessionID, setSessionID] = useState()
    const [videoTimeStamp, setTimeStamp] = useState()
    const [contextName, setContextName] = useState()
    
    const [queryRank, setQueryRank] = useState(0)

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
            promptContents[item] = { question: data.question, answer: data.answer }
        }
    })

    if (typeof window !== "undefined") {
        window.addEventListener("message", (event) => {
            const recPayload = event.data
            // console.log('received payload: ', recPayload)
            setContactAddress(recPayload.contact)
            setSessionID(recPayload.sessionID)
            setVisiblePrompt(recPayload.promptID)
            setQueryRank(getQueryrank(recPayload.promptID, query.prompts))
            setTimeStamp(recPayload.timeStamp)
            setContextName(recPayload.contextName)
        }, false)
    }

    if (!promptContents) {
        return <div>Retrieving prompt contents...</div>
    }


    function onFeedback() {
        communicateToWebcomponent(contactAddress, sessionID, videoTimeStamp)
        setVisiblePrompt(null)

        // Only save context if not accessed via context url
        if (contactAddress.indexOf('?t=') == -1) {
            saveContext(visiblePrompt, contactAddress, videoTimeStamp, contextName)
        }
    }

    const totalPrompts = Object.keys(promptContents).length

    const status = visiblePrompt in promptContents ? 1 : (queryRank < totalPrompts || totalPrompts == 0 ? 2 : 3)

    return (
        <>
            {/* <UserStatus></UserStatus> */}
            <Topbar n={queryRank} total={totalPrompts} status={status}></Topbar>
            {visiblePrompt in promptContents ? (
                    <ReviewItem promptID={visiblePrompt}
                        front={promptContents[visiblePrompt].question}
                        back={promptContents[visiblePrompt].answer}
                        n={queryRank}
                        total={totalPrompts}
                        onFeedback={onFeedback}></ReviewItem>
            )
                :
                (
                    <div className="placeholder">
                    </div>
                )
            }
        </>
    )
}