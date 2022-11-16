import { useUser } from '@auth0/nextjs-auth0'
import { useEffect, useState } from 'react';
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
    const [user, setUser] = useState()

    useInterval(
        () => {
            fetchAndSetUser(setUser)
        },
        user ? null : 1500,
    )

    // no user --> red dot and refetch
    // user --> green dot

    return (
        <div>{JSON.stringify(user)}</div>
    )
}