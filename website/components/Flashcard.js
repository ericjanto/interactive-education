import * as Tabs from '@radix-ui/react-tabs'

export function Flashcard({ front, back }) {
    return (
        <div style={{ borderStyle: "dotted" }}>
            <Tabs.Root defaultValue='question-tab' orientation='horizontal'>
                <Tabs.List aria-label='tabs example'>
                    <Tabs.Trigger value='question-tab'>Question</Tabs.Trigger>
                    <Tabs.Trigger value='answer-tab'>Answer</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="question-tab">{front}</Tabs.Content>
                <Tabs.Content value="answer-tab">{back}</Tabs.Content>
            </Tabs.Root>
        </div>
    )
}