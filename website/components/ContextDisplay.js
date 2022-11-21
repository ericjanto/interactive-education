import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Cross2Icon } from '@radix-ui/react-icons'
import useSWR from "swr"

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data)
    }

    return data
}


function getTopTenContextLinks(items) {
    // {name: link}
    const links = []
    for (var i = 0; i < items.length; i++) {
        if (i > 10) {
            break
        } else {
            links.push([items[i].link_name,items[i].context_link])
        }
    }
    return links
}

export function ContextDisplay({ promptID }) {
    const { data, error } = useSWR(
        () => `/api/userpromptcontext/${promptID}`,
        fetcher
    )

    if (!data) return <div>Fetching context data</div>
    if (error) return <div>{error}</div>


    if (data.items.length == 0) return <div>No context data available yet</div>

    const topTenContextLinks = getTopTenContextLinks(data.items)

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <div className='topbar-info information' style={{ cursor: 'pointer' }}>
                        {'<- Jump back to explanation'}
                    </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Flashcard Context</Dialog.Title>
                        <Dialog.Description className='dialog-description'>
                            You have encountered this flashcard in videos on the below-listed websites. Follow the links to jump back to the specific video part.
                        </Dialog.Description>
                        <Dialog.Close asChild>
                            <button className="dialog-close-button" aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                        <ScrollArea.Root className="ScrollAreaRoot">
                            <ScrollArea.Viewport className="ScrollAreaViewport">
                                <div style={{ padding: '15px 20px' }}>
                                    <div className="Text">Links</div>
                                    {topTenContextLinks.map((element) => (
                                        <div className='Tag'>
                                            <a href={element[1]} target='_blank'>{element[0]}↗</a>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                                <ScrollArea.Thumb className="ScrollAreaThumb" />
                            </ScrollArea.Scrollbar>
                            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                                <ScrollArea.Thumb className="ScrollAreaThumb" />
                            </ScrollArea.Scrollbar>
                            <ScrollArea.Corner className="ScrollAreaCorner" />
                        </ScrollArea.Root>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}