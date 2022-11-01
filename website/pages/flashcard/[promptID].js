import { Feedback } from '../../components/Feedback'
import { Flashcard } from '../../components/Flashcard'
import { Login } from '../../components/Login'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data)
  }

  return data
}

export default function Prompt() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.promptID && `/api/prompts/${query.promptID}`,
    fetcher
  )

  // TODO: ensure that only listened to messages
  // from certain origin? but which origin? maybe
  // ensure that message is encoded / starts in a certain way
  if (typeof window !== "undefined") {
    window.addEventListener("message", (event) => {
      const messageData = JSON.stringify(event.data);
      console.log(messageData)
    }, false)
  }

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Login></Login>
      <Flashcard front={data.question} back={data.answer}></Flashcard>
      <Feedback promptID={query.promptID}></Feedback>
    </>
  )
}