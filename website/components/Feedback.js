function postResponse(
    payload,
) {
    const url = `/api/userprompts`
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


export function Feedback({ promptID, onFeedback }) {

    // TODO: ensure that only listened to messages
    // from certain origin? but which origin? maybe
    // ensure that message is encoded / starts in a certain way

    const dbPayload = {
        promptID: promptID,
        remembered: null,
    }

    return (
        <div>
            <button onClick={() => {
                dbPayload.remembered = false
                postResponse(dbPayload)
                onFeedback()
            }}>Forgotten</button>
            <button onClick={() => {
                dbPayload.remembered = true
                postResponse(dbPayload)
                onFeedback()
            }}>Remembered</button>
        </div >
    )
}