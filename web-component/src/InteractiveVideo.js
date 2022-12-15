// import { InteractiveElement } from './InteractiveElement'
import { extractVideo, extractPromptIDs, extractTimedInteractiveElements } from './utils'

// function renderInteractiveElement(parent, interactiveElement) {
//     // Could just have a single iframe element where I change
//     // the src and if src set, display, otherwise don't display
//     const shadowRoot = parent.attachShadow({ mode: 'closed' })
// }

// To avoid stop sends from other flashcards to interfere with this session
function dec2hex(dec) {
    return dec.toString(16).padStart(2, '0')
}

function generateSessionID(len) {
    const arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function composeURL(promptIDs) {
    const query = promptIDs.join('&prompts=')

    // API_URL gets injected by webpack at compile-time
    return `${API_URL}/embed?prompts=${query}` // eslint-disable-line no-undef
}

function getHeightForReviewAreaOfWidth(width) {
    const gridUnit = 8
    const edgeMargin = 16

    const promptWidth = Math.min(500, width - edgeMargin * 2)
    const promptHeight = Math.round((promptWidth * 5) / 6)
    return promptHeight + (7 + 11) * gridUnit
}

function setIFrameHeight(iframe) {
    const effectiveWidth = iframe.getBoundingClientRect().width
    // console.log(effectiveWidth)
    iframe.style.height = `${getHeightForReviewAreaOfWidth(effectiveWidth)}px`
}

function extractGoToTimestamp(url) {
    const timeIdentifier = '?t='
    if (url.indexOf(timeIdentifier) > 0) {
        return url.substring(url.indexOf(timeIdentifier) + timeIdentifier.length)
    } else {
        return null
    }
}

function getContextName() {
    let contextName
    const meta = document.querySelector("meta[property='og:site_name']")
    if (meta) {
        contextName = meta.getAttribute('content')
    } else {
        const url = window.location.href
        contextName = url.slice(url.indexOf('://') + 3, url.lastIndexOf('/'))
    }
    return contextName
}

export class InteractiveVideo extends HTMLElement {
    #video = extractVideo(this)
    #interactiveElements = extractTimedInteractiveElements(this)
    #promptIDs = extractPromptIDs(this)

    connectedCallback() {
        const video = this.#video
        const sessionID = generateSessionID()
        const interactiveElements = this.#interactiveElements
        const times = Object.keys(interactiveElements)
        const promptIDs = this.#promptIDs

        const shadowRoot = this.attachShadow({ mode: 'closed' })
        shadowRoot.innerHTML = '<slot></slot>'
        const iframe = document.createElement('iframe')

        iframe.style.border = 'none'
        iframe.style.width = '100%'
        setIFrameHeight(iframe)

        iframe.setAttribute('loading', 'eager')
        iframe.setAttribute(
            'sandbox',
            'allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-modals'
        )
        shadowRoot.appendChild(iframe)

        window.addEventListener(
            'message',
            (event) => {
                // TODO: ensure it's from flashcard website
                const data = event.data
                if ('sessionID' in data) {
                    if (data.sessionID == sessionID) {
                        if (data.continueVideo) {
                            video.scrollIntoView({ behavior: 'smooth' })
                            video.controls = true
                            video.play()
                            // Bit of a hack -- add timestamp a second after video
                            if ('timeStamp' in data) {
                                setTimeout(() => {
                                    times.push(data.timeStamp)
                                }, 1500)
                            }
                        }
                    }
                }
            },
            false
        )

        requestAnimationFrame(() => {
            setIFrameHeight(iframe)
            iframe.src = composeURL(promptIDs)
        })

        const goToTimestamp = extractGoToTimestamp(window.location.href)

        let iframeLoaded = false
        iframe.onload = function () {
            iframeLoaded = true
        }

        let jumpedYet = false

        video.oncanplay = function () {
            if (goToTimestamp && !jumpedYet) {
                video.currentTime = goToTimestamp
                jumpedYet = true
            }
        }

        video.ontimeupdate = function () {
            let now = Math.floor(this.currentTime).toString()
            if (times.includes(now)) {
                video.pause()
                // Only disable controls if user didn't jump with context link
                if (!window.location.href.includes('?t=')) {
                    video.controls = false
                }
                iframe.scrollIntoView({ behavior: 'smooth' })

                // Ensure that not in fullscreen
                try {
                    window.document.exitFullscreen()
                } catch (error) {
                    console.log(error)
                }

                const promptID = interactiveElements[now].id

                const contactUrl = window.location.href
                const contextUrl = 'ContextURL not implemented yet'

                const contextName = getContextName()

                const payload = {
                    promptID: promptID,
                    contact: contactUrl,
                    sessionID: sessionID,
                    context: contextUrl,
                    timeStamp: now,
                    contextName: contextName,
                }

                times.splice(times.indexOf(now), 1)

                if (iframeLoaded) {
                    const iFWindow = iframe.contentWindow
                    iFWindow.postMessage(payload, iframe.src)
                }

                const interval = setInterval(() => {
                    const iFWindow = iframe.contentWindow
                    iFWindow.postMessage(payload, iframe.src)
                }, 500)

                if (iframeLoaded) {
                    clearInterval(interval)
                }
            }
        }
    }
}
