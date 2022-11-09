import { styled } from '@stitches/react'
import { useState } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

export function Flashcard({ front, back }) {
    const FlexContainer = styled('div', {
        display: "flex",
        flexWrap: 'wrap',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        height: '100%',
    })

    const FlexItem = styled('div', {

    })

    const [showAnswer, setShowAnswer] = useState(false)
    return (
        <FlexContainer>
            <ReactMarkdown
                children={front}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            />
            {showAnswer ?
                <ReactMarkdown
                    children={back}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                />
                :
                <button onClick={() => { setShowAnswer(true) }}>
                    Show answer
                </button>
            }
        </FlexContainer>
    )
}