import * as Tabs from '@radix-ui/react-tabs'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

export function Flashcard({ front, back }) {
    return (
        <div style={{ borderStyle: "dotted" }}>
            <Tabs.Root defaultValue='question-tab' orientation='horizontal'>
                <Tabs.List aria-label='tabs example'>
                    <Tabs.Trigger value='question-tab'>Question</Tabs.Trigger>
                    <Tabs.Trigger value='answer-tab'>Answer</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="question-tab">
                    <ReactMarkdown
                        children={front}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    />
                </Tabs.Content>
                <Tabs.Content value="answer-tab">
                <ReactMarkdown
                        children={back}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}