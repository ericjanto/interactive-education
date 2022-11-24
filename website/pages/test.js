import { useEffect } from "react"
export default function Test() {
    useEffect(() => {
        if (window && document) {
            const script = document.createElement('script')
            const body = document.getElementsByTagName('body')[0]
            script.src = 'https://interactive-education.vercel.app/interactive-video-component.js'
            body.appendChild(script)
        }
    }, [])
    return (
        <>

            <h1>Test page</h1>
            <interactive-video>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:01"></interactive-element>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:04"></interactive-element>
                <video controls src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                    width="620"></video>
            </interactive-video>
            <p>Some content</p>

        </>
    )
}