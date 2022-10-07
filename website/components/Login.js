import { useUser } from '@auth0/nextjs-auth0'

export function Login() {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <>
            {user ? (
                <p>
                    Logged in as {user.name}
                    <br />
                    User id: {user.sub}
                    <br />
                    <a target='_blank' href='/api/auth/logout'>Logout</a>
                </p>
            )
                : (
                    <p>
                        <a target='_blank' href='/api/auth/login'>Login</a>
                    </p>
                )}
        </>
    )
}