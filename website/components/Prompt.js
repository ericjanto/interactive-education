import { Feedback } from './Feedback'
import { Flashcard } from './Flashcard'
import useSWR from 'swr'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data)
  }

  return data
}

export default function Prompt({ promptID }) {
  const { data, error } = useSWR(
    () => promptID && `/api/prompts/${promptID}`,
    fetcher
  )

  console.log(promptID)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Flashcard front={data.question} back={data.answer} showQuestion={showQuestion} setShowQuestion={setShowQuestion}></Flashcard>
      <Feedback promptID={promptID}></Feedback>
    </>
  )
}