import Link from 'next/link'
import {Login} from '../components/Login'

export default function Home() {
  return (
    <>
      <h1>RemWatch</h1>
      <Login></Login>
      <Link href="/review">Review prompts</Link>
    </>
  )
}
