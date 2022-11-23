import { useState } from 'react';
import { useInterval } from 'usehooks-ts'
import { getBaseUrl, sessionCookieExists } from '../utils/lib'

// TODO: This doesn't work on hosted version, for some reason. Something to investigate.
// maybe check if appSession cookie is existent instead?
// if existent --> assume logged in
// TODO: in above case, check that you can successfully post messages
function validateUser(setUser) {
    console.log('checking user status')
    console.log('>>>', sessionCookieExists())
    if (sessionCookieExists()) {
        setUser('validated')
    } else {
        setUser(null)
    }
};

export function UserStatus() {
    const [user, setUser] = useState('fetching')

    console.log('hello? :(')
    useInterval(
        () => {
            validateUser(setUser)
        },
        1500
    )

    // no user --> red dot and refetch
    // user --> green dot
    if (user == 'fetching') {
        return <div className='topbar-userstatus'>Checking user...</div>
    }

    const baseURL = getBaseUrl()

    return (
        // TODO: switch(user)
        <div className='topbar-userstatus'>
            {user ?
                <div>
                    {`Answers are saved to `}
                    <a target='_blank' href={baseURL} rel="noreferrer">RemWatch</a>
                </div>
                :
                <div>
                    <a target='_blank' href='/api/auth/login' rel="noreferrer">Login</a>
                    {` to save answers to `}
                    <a target='_blank' href={baseURL} rel="noreferrer">RemWatch</a>
                </div>
            }
        </div>
    )
}