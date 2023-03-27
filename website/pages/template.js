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
                <title>Convolutions and Image Processing</title>
                <meta property="og:site_name" content="Convolutions and Image Processing" />
            </Head>
            <h1>Website Convolutions and Image Processing</h1>
            <br/>
            <p>
            In this engaging lecture from the MIT course "18.S191 Introduction to Deep Learning," Grant Sanderson explores the topic of convolutions in image processing. Through clear explanations and intuitive examples, he shows how convolutions are used to detect features in images, and how they can be applied in a variety of computer vision tasks. One stand-out quote from the lecture is:
            </p>
            <br/>
            <blockquote>&quot;A convolutional neural network is like a machine that takes in an image, and then it transforms that image through a series of operations in a way that highlights the features that are relevant for a particular task.&quot; – Sanderson</blockquote>
            <br/>
            <p>
            Sanderson's passion for teaching and his ability to break down complex topics into digestible pieces make this video an excellent resource for anyone looking to learn more about deep learning and image processing.
            </p>
            <br/>
            {/* <interactive-video>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:01"></interactive-element>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:04"></interactive-element>
                <video controls src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                    width="1000">
                </video>
            </interactive-video> */}
            <interactive-video>
                <interactive-element type="flashcard" id="cGbkE2GhernWmifSF1x9" timestamp="00:00:27"></interactive-element>
                <interactive-element type="flashcard" id="IkGe6av68j4pagoF5rBe" timestamp="00:01:38"></interactive-element>
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