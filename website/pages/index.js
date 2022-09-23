import PocketBase from 'pocketbase'

async function fetchPrompt(record_id) {
  // TODO: use SWR instead?
  // https://swr.vercel.app/docs/getting-started
  const client = new PocketBase('http://127.0.0.1:8090')
  // TODO: move this to ENV file
  // const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
  try {
    const record = await client.records.getOne('prompts', record_id, {

    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function Home() {
  fetchPrompt('bkt7p78rwr4kijr').then(
    (value) => console.log(value)
  )
  return (
    <div>
      <h1>API Prototyping</h1>
    </div>
  )
}
