import { useState } from 'react';
import { fetchUserSpecificPromptReviews } from '../utils/firebase';

export default function Test() {
    const [data, setData] = useState()
    const [fetched, setFetched] = useState(false)

    if (!fetched) {
        fetchUserSpecificPromptReviews('63330983c7df7dab21de2918', 'cGbkE2GhernWmifSF1x9').then((result) => {
            setData(result)
            setFetched(true)
        })
    }
    return (
        <>
            <h1>Test page</h1>
            <div>{JSON.stringify(data)}</div>
        </>
    )
}