import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

export default function Login() {
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
                    <Link href='/api/auth/logout'>Logout</Link>
                </p>
            )
                : (
                    <p>
                        <Link href='api/auth/login'>Login</Link>
                    </p>
                )}
        </>
    )
}