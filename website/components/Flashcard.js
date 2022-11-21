import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { useState } from 'react'

import 'katex/dist/katex.min.css'

export function Flashcard({ front, back, showQuestion, setShowQuestion }) {
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
                        <div className='button-info'>
                            <div className='button-text'>Show answer</div>
                            <Image className='button-icon' src="/eye.svg" alt="Show answer icon" width={24} height={24} />
                        </div>
                    </button> : <></>
            }
        </>
    )
}