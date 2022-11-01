import { InteractiveElement } from './InteractiveElement'
import { extractVideo, extractTimedInteractiveElements } from './utils'

function renderInteractiveElement(parent, interactiveElement) {
    // Could just have a single iframe element where I change
    // the src and if src set, display, otherwise don't display
    const shadowRoot = parent.attachShadow({ mode: 'closed' })
}

export class InteractiveVideo extends HTMLElement {
    #video = extractVideo(this)
    #interactiveElements = extractTimedInteractiveElements(this)

    connectedCallback() {
        const video = this.#video
        const interactiveElements = this.#interactiveElements
        const times = Object.keys(interactiveElements)

        const shadowRoot = this.attachShadow({ mode: 'closed' })
        shadowRoot.innerHTML = '<slot></slot>'
        const iframe = document.createElement('iframe')
        iframe.style.border = 'none'
        iframe.style.width = '100%'
        iframe.setAttribute('loading', 'eager')
        iframe.setAttribute(
            'sandbox',
            'allow-scripts allow-same-origin allow-popups allow-modals'
        )
        shadowRoot.appendChild(iframe)

        window.addEventListener("message", (event) => {
            // TODO: ensure it's from flashcard website
            const data = JSON.stringify(event.data);
            console.log(data)
        }, false)

        video.ontimeupdate = function () {
            var now = Math.floor(this.currentTime).toString()
            if (times.includes(now)) {
                video.pause()
                const promptID = interactiveElements[now].id
                iframe.src = `http://localhost:3000/flashcard/${promptID}`
                // renderInteractiveElement(parent, times[now])
                // TODO: check that you actually need to remove time? surely user might want to revisit question
                times.splice(times.indexOf(now), 1)

                // post message to iframe
                iframe.addEventListener('load', () => {
                    setTimeout(() => {
                        const iFWindow = iframe.contentWindow
                        iFWindow.postMessage("i love leila", iframe.src)
                        console.log("dispatched message")
                    }, 1000)
                })
            }
        }
    }
}
