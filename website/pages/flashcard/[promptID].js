import { Flashcard } from '../../components/Flashcard'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Prompt() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.promptID && `/api/prompts/${query.promptID}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Flashcard front={data.question} back={data.answer}></Flashcard>
    </>
  )
}