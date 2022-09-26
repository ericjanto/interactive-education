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
        // iframe.setAttribute(
        //     'sandbox',
        //     'allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-modals'
        // )
        shadowRoot.appendChild(iframe)

        video.ontimeupdate = function () {
            var now = Math.floor(this.currentTime).toString()
            if (times.includes(now)) {
                video.pause()
                const promptID = interactiveElements[now].id
                iframe.src = `http://localhost:3000/flashcard/${promptID}`
                // renderInteractiveElement(parent, times[now])
                times.splice(times.indexOf(now), 1)
            }
        }
    }
}
