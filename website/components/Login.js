import { useUser } from '@auth0/nextjs-auth0'
import { getNormalisedUserID } from '../utils/lib'

export function Login() {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Revalidating user...</div>
    if (error) return <div>{error.message}</div>

    return (
        <>
            {user ? (
                <p>
                    Logged in as {user.name}
                    <br />
                    User id: {getNormalisedUserID(user.sub)}
                    <br />
                    <a target='_blank' href='/api/auth/logout'>Logout</a>
                </p>
            )
                : (
                    <p>
                        <a target='_blank' href='/api/auth/login'>Login to save progress</a>
                    </p>
                )}
        </>
    )
}