import { useEffect } from "react"
import Head from "next/head"

export default function Template() {
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
            <Head>
                <title>Website Template for Interactive Video</title>
                <meta property="og:site_name" content="Website Template for Interactive Video" />
            </Head>
            <h1>Website Template for Interactive Video</h1>
            <br/>
            <p>
                This is a template which shows how to make an interactive video...
                Here could be some introductory content about the video.
            </p>
            <br/>
            <blockquote>Test blockquote</blockquote>
            <br/>
            <p>
                Anim ipsum ullamco et ipsum
                proident cillum irure dolor veniam velit.
                Cupidatat deserunt incididunt est proident nostrud fugiat aliquip culpa duis commodo.
                Dolor veniam non ad qui proident ullamco. Cupidatat duis ad exercitation aliquip
                reprehenderit aute adipisicing cillum occaecat tempor aliquip in ad occaecat deserunt.
                Ullamco amet id ad fugiat pariatur quis. Aliqua laboris occaecat duis proident culpa occaecat.
                Dolore quis ea et aliquip occaecat. Dolore laborum ex duis. Amet do est veniam ut et aliquip cupidatat excepteur
                amet nisi. Quis magna Lorem nulla ut consectetur ad non proident labore nostrud eu mollit. Exercitation ad ex
                labore nulla ullamco incididunt nulla.
            </p>
            <br/>
            <interactive-video>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:01"></interactive-element>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:04"></interactive-element>
                <video controls src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                    width="1000">
                </video>
            </interactive-video>
            <interactive-video>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:01"></interactive-element>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:04"></interactive-element>
                <video controls src="/lecture_trimmed.mp4"
                    width="1000">
                </video>
            </interactive-video>
            <p style={{'marginTop': '15px'}}>
                Here could be a summary about the content of the video. Anim ipsum ullamco et ipsum
                proident cillum irure dolor veniam velit.
                Cupidatat deserunt incididunt est proident nostrud fugiat aliquip culpa duis commodo.
                Dolor veniam non ad qui proident ullamco. Cupidatat duis ad exercitation aliquip
                reprehenderit aute adipisicing cillum occaecat tempor aliquip in ad occaecat deserunt.
                Ullamco amet id ad fugiat pariatur quis. Aliqua laboris occaecat duis proident culpa occaecat.
                Dolore quis ea et aliquip occaecat. Dolore laborum ex duis. Amet do est veniam ut et aliquip cupidatat excepteur
                amet nisi. Quis magna Lorem nulla ut consectetur ad non proident labore nostrud eu mollit. Exercitation ad ex
                labore nulla ullamco incididunt nulla.
            </p>
        </>
    )
}