import { useState } from "react";

function postResponse(
    url,
    payload,
) {
    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    const response = fetch(url, options);
    response.then((r) => {
        r.json().then((res) => {
            console.log(res)
            // TODO: if unauthorised: user not logged in
        })
    })
};

function communicateToWebcomponent(origin, sessionID, videoTimeStamp) {
    console.log(">>>", origin)
    const payload = {
        continueVideo: true,
        sessionID: sessionID,
        timeStamp: videoTimeStamp
    }
    window.parent.postMessage(payload, origin)
}


export function Feedback({ promptID, resetPrompt }) {
    const url = `/api/userprompts`

    // TODO: ensure that only listened to messages
    // from certain origin? but which origin? maybe
    // ensure that message is encoded / starts in a certain way

    // TODO: just refactor this to useState(dict) instead of two
    // constants
    const [contactAddress, setContactAddress] = useState(null)
    const [sessionID, setSessionID] = useState(null)
    const [videoTimeStamp, setTimeStamp] = useState("1")

    if (typeof window !== "undefined") {
        window.addEventListener("message", (event) => {
            const recPayload = event.data
            console.log('received payload: ', recPayload)
            setContactAddress(recPayload.contact)
            setSessionID(recPayload.sessionID)
            // setTimeStamp(recPayload.time)
            // console.log("<<<", recPayload.contact)
        }, false)
    }

    const dbPayload = {
        promptID: promptID,
        remembered: null,
    }

    return (
        <div>
            <button onClick={() => {
                dbPayload.remembered = false
                postResponse(url, dbPayload)
                communicateToWebcomponent(contactAddress, sessionID, videoTimeStamp)
                resetPrompt(null)
            }}>Forgotten</button>
            <button onClick={() => {
                dbPayload.remembered = true
                postResponse(url, dbPayload)
                communicateToWebcomponent(contactAddress, sessionID, videoTimeStamp)
                resetPrompt(null)
            }}>Remembered</button>
        </div >
    )
}