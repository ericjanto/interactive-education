import { InteractiveElement } from './InteractiveElement'

export class InteractiveVideo extends HTMLElement {
  #video = Array.from(this.children).filter((element) => element instanceof HTMLVideoElement)[0]

  getInteractiveElements() {
    // TODO: dictionary <time: element>
    const elements = {}
    this.querySelectorAll(':scope > interactive-element').forEach((element) => {
      if (element instanceof InteractiveElement) {
        if (this.validTime(element.time)) {
          elements[element.time] = element
        }
      }
    })
    return elements
  }

  validTime(time) {
    // TODO: validate time
    return true
  }

  renderFlashcard() {
    // TODO
  }

  connectedCallback() {
    const interactiveElements = this.getInteractiveElements()
    console.log(interactiveElements)
    // for (let i = 0; i < interactiveElements.length; i++) {
    //   console.log('<<<', interactiveElements[i] instanceof InteractiveElement)
    //   console.log('>>>', interactiveElements[i].content)
    // }
    this.#video.onplaying = function () {
      console.log('>>> Video playing triggered.')
    }

    // video.currentTime <-- might be set to duration of video before playing
  }

  // Corner cases:
  // * time exactly video duration or time more than duration
  // * two interactive elements at same time
}

function validSetup() {
  // Check that video there, and at least one interactive element
  return true
}
