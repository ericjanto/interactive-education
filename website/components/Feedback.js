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
    response.then((r) => {r.json().then((res) => {
            console.log(res)
            // TODO: if unauthorised: user not logged in
        })
    })
};


export function Feedback({ promptID, origin}) {
    const url = `/api/userprompts`

    const payload = {
        promptID: promptID,
        remembered: null,
    }

    if (typeof window !== "undefined") {
        window.parent.postMessage("continue video!", origin)
    }

    return (
        <div>
            <button onClick={() => {
                payload.remembered = false
                postResponse(url, payload)
            }}>Forgotten</button>
            <button onClick={() => {
                payload.remembered = true
                postResponse(url, payload)
            }}>Remembered</button>
        </div >
    )
}