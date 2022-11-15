import { useState } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

export function Flashcard({ front, back }) {
    const [showQuestion, setShowQuestion] = useState(true)

    return (
        <>
            <div className='hidden-answer' style={!showQuestion ? { transform: 'translateY(0px)' } : { transform: 'translateY(10px)' }}>
                {!showQuestion ? <ReactMarkdown
                    children={front}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                /> : <></>}
            </div>
            <div className='centre-stage' style={!showQuestion ? { transform: 'translateY(0px)' } : { transform: 'translateY(10px)' }}>
                {
                    showQuestion ?
                        <ReactMarkdown
                            children={front}
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        /> :
                        <ReactMarkdown
                            children={back}
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        />
                }
            </div>
                {
                    showQuestion ?
                        <button id={1} className='prompt-button z-priority' onClick={() => { setShowQuestion(false); }}>
                            Show answer
                        </button> : <></>
                }
        </>
    )
}