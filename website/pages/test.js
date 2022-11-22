import { useState } from 'react';
import useSWR from 'swr';
import { fetchMultiplePrompts } from '../utils/firebase';

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data)
    }

    return data
}

export default function Test() {
    // const [data, setData] = useState()
    const [fetched, setFetched] = useState(false)

    const prompts = ['1','2']

    const { data, error } = useSWR(
        () => `/api/promptscontents/${prompts.join('/')}`,
        fetcher
    )

    if (data) {
        // setData(data)
        console.log(data)
    }
    if (!data) return <div>fetching...</div>


    // if (!fetched) {
    //     fetchMultiplePrompts(['IkGe6av68j4pagoF5rBe']).then((result) => {
    //         console.log(result)
    //         setData(result)
    //         setFetched(true)
    //     })
    // }
    return (
        <>
            <h1>Test page</h1>
            <div>{JSON.stringify(data)}</div>
        </>
    )
}