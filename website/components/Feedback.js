import Image from 'next/image'


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
        <div className="lowerbar feedback-buttons">
            <button className="prompt-button pb-left" onClick={() => {
                dbPayload.remembered = false
                postResponse(dbPayload)
                onFeedback(false)
            }}>
                <div className='button-info'>
                    <div className='button-text'>Forgotten</div>
                    <Image className='button-icon' src="/x.svg" alt="Show answer icon" width={24} height={24} />
                </div>
            </button>
            <button className="prompt-button" onClick={() => {
                dbPayload.remembered = true
                postResponse(dbPayload)
                onFeedback(true)
            }}>
                <div className='button-info'>
                    <div className='button-text'>Remembered</div>
                    <Image className='button-icon' src="/check.svg" alt="Show answer icon" width={24} height={24} />
                </div>
            </button>
        </div >
    )
}