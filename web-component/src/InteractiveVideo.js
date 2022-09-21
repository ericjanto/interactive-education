import { InteractiveElement } from './InteractiveElement'

export class InteractiveVideo extends HTMLElement {
  // #video = Array.from(this.children).filter((element) => element instanceof HTMLVideoElement)[0]
  #video = this.getVideo()

  getVideo() {
    const queryElement = this.querySelector(':scope > video')
    if (queryElement instanceof HTMLVideoElement) {
      return queryElement
    }
  }

  getTimeElementMap() {
    // TODO: dictionary <time: element>
    const elements = {}
    this.querySelectorAll(':scope > interactive-element').forEach((element) => {
      if (element instanceof InteractiveElement) {
        const timeInSeconds = this.getValidatedTime(element.time)
        if (timeInSeconds) {
          elements[timeInSeconds] = element
        }
      }
    })
    return elements
  }

  getValidatedTime(time) {
    // Native JavaScript does not support timestamps out of the box;
    // the workaround with Date() is a bit of a hack
    // TODO: check if Date.parse throws error if invalid datestring
    try {
      const dateString = Date.parse('1970-01-01T' + time + 'Z')
      const seconds = new Date(dateString).getTime() / 1000
      // TODO: check that time is within video duration
      if (true) {
        return seconds
      }
    } catch (error) {
      console.err('Invalid time format: ', time)
    }
    return null
  }

  renderFlashcard() {
    // TODO
  }

  connectedCallback() {
    const interactiveElements = this.getTimeElementMap()
    console.log(interactiveElements)
    // for (let i = 0; i < interactiveElements.length; i++) {
    //   console.log('<<<', interactiveElements[i] instanceof InteractiveElement)
    //   console.log('>>>', interactiveElements[i].content)
    // }
    this.#video.onplaying = function () {
      console.log('>>> Video playing triggered.')
      console.log(this.duration)
      // TODO: del element entries where val of time is not within duration
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
