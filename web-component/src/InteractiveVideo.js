import { InteractiveElement } from './InteractiveElement'
import { extractVideo, extractTimedInteractiveElements } from './utils'

function renderInteractiveElement(video, interactiveElement) {
    console.log()
}

export class InteractiveVideo extends HTMLElement {
    #video = extractVideo(this)
    #interactiveElements = extractTimedInteractiveElements(this)

    connectedCallback() {
        const video = this.#video
        const interactiveElements = this.#interactiveElements
        const times = Object.keys(interactiveElements)
        video.ontimeupdate = function () {
            var now = Math.floor(this.currentTime).toString()
            if (times.includes(now)) {
                video.pause()
                renderInteractiveElement(video, times[now])
                times.splice(times.indexOf(now), 1)
            }
        }
    }
}
