import Login from '../components/Login'
import { useUser } from '@auth0/nextjs-auth0'

export default function Home() {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <div>Loading user data...</div>
  if (error) return <div>{error.message}</div>
  if (user) {
    return (
      <>
        <h1>Front-end yet to be implemented...</h1>
        <Login></Login>
        <p>Logged in as: {user.email}</p>
      </>
    )
  } else {
    return (
      <>
        <h1>Front-end yet to be implemented...</h1>
        <Login></Login>
      </>
    )
  }
}
