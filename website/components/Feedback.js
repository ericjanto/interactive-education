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
    response.then((r) => {r.json().then((res) => {
            console.log(res)
        })
    })
};


export function Feedback({ promptID }) {
    const url = `/api/userprompts`

    const [remembered, setRemembered] = useState(false)

    const payload = {
        promptID: promptID,
        remembered: remembered,
    }

    return (
        <div>
            <button onClick={() => {
                setRemembered(false)
                postResponse(url, payload)
            }}>Forgotten</button>
            <button onClick={() => {
                setRemembered(true)
                postResponse(url, payload)
            }}>Remembered</button>
        </div >
    )
}