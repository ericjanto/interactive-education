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
    // appSession cookie with new_value is not created in hosted version,
    // so below always returns true
    if (sessionCookieExists()) {
        setUser('validated')
    } else {
        setUser(null)
    }
};

export function UserStatus() {
    const [user, setUser] = useState('fetching')

    const cookiename = 'testCookie'
    var d = new Date();
    d.setTime(d.getTime() + (1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cookiename + "=new_value;path=/;" + expires

    useInterval(
        () => {
            validateUser(setUser)
        },
        1500
    )

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