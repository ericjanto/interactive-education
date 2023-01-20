import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

export function Flashcard({ front, back, showQuestion, setShowQuestion }) {
    return (
        <>
            <div className='hidden-answer' style={!showQuestion ? { transform: 'translateY(0px)' } : { transform: 'translateY(10px)' }}>
                {!showQuestion ?
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >{front}</ReactMarkdown>
                    :
                    <></>}
            </div>
            <div className='centre-stage' style={!showQuestion ? { transform: 'translateY(0px)' } : { transform: 'translateY(10px)' }}>
                {
                    showQuestion ?
                        <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >{front}</ReactMarkdown> :
                        <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >{back}</ReactMarkdown>
                }
            </div>
            {
                showQuestion ?
                    <button id={1} className='prompt-button z-priority' onClick={() => {
                        setShowQuestion(false)
                        console.log('Show answer button clicked')
                        }}
                        tabIndex={0}
                        >
                        <div className='button-info'>
                            <div className='button-text'>Show answer</div>
                            <Image className='button-icon' src="/eye.svg" alt="Show answer icon" width={24} height={24} />
                        </div>
                    </button> : <></>
            }
        </>
    )
}