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

export function SimpleFeedback({ promptID, onFeedback }) {
    const url = `/api/userprompts`
    const dbPayload = {
        promptID: promptID,
        remembered: null,
    }

    return (
        <div>
            <button onClick={() => {
                dbPayload.remembered = false
                postResponse(url, dbPayload)
                onFeedback()
            }}>Forgotten</button>
            <button onClick={() => {
                dbPayload.remembered = true
                postResponse(url, dbPayload)
                onFeedback()
            }}>Remembered</button>
        </div >
    )
}