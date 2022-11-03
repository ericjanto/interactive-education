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

function communicateToWebcomponent(origin, sessionID) {
    console.log(origin)
    const payload = {
        continueVideo: true,
        sessionID: sessionID,
    }
    window.parent.postMessage(payload, origin)
}


export function Feedback({ promptID }) {
    const url = `/api/userprompts`

    // TODO: ensure that only listened to messages
    // from certain origin? but which origin? maybe
    // ensure that message is encoded / starts in a certain way

    // TODO: just refactor this to useState(dict) instead of two
    // constants
    const [contactAddress, setContactAddress] = useState(null)
    const [sessionID, setSessionID] = useState(null)

    if (typeof window !== "undefined") {
        window.addEventListener("message", (event) => {
            const recPayload = event.data
            console.log('received payload: ', recPayload)
            setContactAddress(recPayload.contact)
            setSessionID(recPayload.sessionID)
        }, false)
    }

    const sendPayload = {
        promptID: promptID,
        remembered: null,
    }

    // change this to be only fired on button trigger, with continue video instruction
    // if (typeof window !== "undefined" && contact) {
    //     window.parent.postMessage("continue video!", origin)
    //     console.log('message sent back to parent')
    // }

    return (
        <div>
            <button onClick={() => {
                sendPayload.remembered = false
                postResponse(url, sendPayload)
                communicateToWebcomponent(contactAddress, sessionID)
            }}>Forgotten</button>
            <button onClick={() => {
                sendPayload.remembered = true
                postResponse(url, sendPayload)
                communicateToWebcomponent(contactAddress, sessionID)
            }}>Remembered</button>
        </div >
    )
}