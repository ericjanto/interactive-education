import { InteractiveElement } from './InteractiveElement'
import { extractVideo, extractPromptIDs, extractTimedInteractiveElements } from './utils'

function renderInteractiveElement(parent, interactiveElement) {
    // Could just have a single iframe element where I change
    // the src and if src set, display, otherwise don't display
    const shadowRoot = parent.attachShadow({ mode: 'closed' })
}

// To avoid stop sends from other flashcards to interfere with this session
function dec2hex(dec) {
    return dec.toString(16).padStart(2, '0')
}

function generateSessionID(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function composeURL(promptIDs) {
    const query = promptIDs.join('&prompts=')
    return `http://localhost:3000/embed?prompts=${query}`
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
        iframe.setAttribute('loading', 'eager')
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-modals allow-forms')
        shadowRoot.appendChild(iframe)

        window.addEventListener(
            'message',
            (event) => {
                // TODO: ensure it's from flashcard website
                const data = event.data
                if ('sessionID' in data) {
                    if (data.sessionID == sessionID) {
                        if (data.continueVideo) {
                            video.play()
                            // Bit of a hack -- add timestamp a second after video 
                            if ('timeStamp' in data) {
                                setTimeout(() => {
                                    times.push(data.timeStamp)
                                }, 1000)
                            }
                        }
                    }
                }
            },
            false
        )

        iframe.src = composeURL(promptIDs)

        video.ontimeupdate = function () {
            var now = Math.floor(this.currentTime).toString()
            if (times.includes(now)) {
                video.pause()
                const promptID = interactiveElements[now].id

                const contactUrl = window.location.href
                const contextUrl = 'ContextURL not implemented yet'

                const payload = {
                    promptID: promptID,
                    contact: contactUrl,
                    sessionID: sessionID,
                    context: contextUrl,
                    timeStamp: now,
                }

                times.splice(times.indexOf(now), 1)

                const iFWindow = iframe.contentWindow
                iFWindow.postMessage(payload, iframe.src)
                console.log('sent payload from video')
            }
        }
    }
}
