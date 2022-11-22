import { useState } from 'react';
import { fetchMultiplePrompts, fetchUserSpecificPromptReviews } from '../utils/firebase';

export default function Test() {
    const [data, setData] = useState()
    const [fetched, setFetched] = useState(false)

    if (!fetched) {
        fetchMultiplePrompts(['cGbkE2GhernWmifSF1x9', 'IkGe6av68j4pagoF5rBe']).then((result) => {
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