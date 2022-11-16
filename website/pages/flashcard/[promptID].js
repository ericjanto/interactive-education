import { useRouter } from 'next/router'
import useSWR from 'swr'
import ReviewItem from '../../components/ReviewItem'

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

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <ReviewItem promptID={query.promptID} front={data.question} back={data.answer} onFeedback={() => {}}></ReviewItem>
    </>
  )
}