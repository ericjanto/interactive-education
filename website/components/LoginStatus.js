import { useState } from 'react';
import { useInterval } from 'usehooks-ts'

// TODO: change this to an api endpoint which returns whether user is authenticated
function fetchAndSetUser(setUser) {
    const url = `/api/auth/me`

    const response = fetch(url);
    response.then((r) => {
        r.json().then((res) => {
            if (res.error == 'not_authenticated') {
                setUser(null)
            } else {
                setUser(res.nickname)
            }
        })
    })
};

export function UserStatus() {
    const [user, setUser] = useState('fetching')

    useInterval(
        () => {
            fetchAndSetUser(setUser)
        },
        1500
    )

    // no user --> red dot and refetch
    // user --> green dot
    if (user == 'fetching') {
        return <div className='topbar-userstatus'>Checking user...</div>
    }

    return (
        // TODO: switch(user)
        <div className='topbar-userstatus'>
            {user ?
                <div>
                    {`Answers are saved to `}
                    {/* TODO: production vs dev paths. might be able to just use '/'? */}
                    {/* <a target='_blank' href='http://localhost:3000/' rel="noreferrer">RemWatch</a> */}
                    <a target='_blank' href='https://interactive-education.vercel.app/' rel="noreferrer">RemWatch</a>
                </div>
                :
                <div>
                    <a target='_blank' href='/api/auth/login' rel="noreferrer">Login</a>
                    {` to save answers to `}
                    {/* TODO: production vs dev paths */}
                    {/* <a target='_blank' href='http://localhost:3000/' rel="noreferrer">RemWatch</a> */}
                    <a target='_blank' href='https://interactive-education.vercel.app/' rel="noreferrer">RemWatch</a>
                </div>
            }
        </div>
    )
}