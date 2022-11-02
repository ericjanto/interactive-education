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


export function Feedback({ promptID, origin }) {
    const url = `/api/userprompts`

    // TODO: ensure that only listened to messages
    // from certain origin? but which origin? maybe
    // ensure that message is encoded / starts in a certain way
    var contact = null

    if (typeof window !== "undefined") {
        window.addEventListener("message", (event) => {
            const recPayload = JSON.stringify(event.data)
            console.log('received payload: ', recPayload)
            contact = recPayload.contact
        }, false)
    }

    const sendPayload = {
        promptID: promptID,
        remembered: null,
    } // useState, or just manually?

    // change this to be only fired on button trigger, with continue video instruction
    if (typeof window !== "undefined" && contact) {
        window.parent.postMessage("continue video!", origin)
        console.log('message sent back to parent')
    }

    return (
        <div>
            <button onClick={() => {
                sendPayload.remembered = false
                postResponse(url, sendPayload)
            }}>Forgotten</button>
            <button onClick={() => {
                sendPayload.remembered = true
                postResponse(url, sendPayload)
            }}>Remembered</button>
        </div >
    )
}