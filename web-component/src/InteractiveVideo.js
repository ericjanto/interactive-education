import { InteractiveElement } from './InteractiveElement'

export class InteractiveVideo extends HTMLElement {
  constructor() {
    super()

    // Find (first) video amongst children
    const children = Array.from(this.children)
    const video = children.filter((element) => element instanceof HTMLVideoElement)[0]

    video.onplaying = function () {
      console.log('>>> Video playing triggered.')
    }

    // Print num of interactive elements to console
    // Print attribute to console
    // Only print valid attributes to console
    // Pack valid attributes into dictionary
    console.log()

    // Can play / pause like this:
    // video.play(), video.pause()
    // video.currentTime <-- might be set to duration of video before playing

    // Corner cases:
    // * time exactly video duration or time more than duration
    // * two interactive elements at same time
  }

  // TODO: to something when connectedCallback()

  // static get validAttributes() {
  //   return ['times']
  // }
}

// function isPlaying(video) {
//   if (video instanceof HTMLVideoElement) {
//     return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
//   } else {
//     return false
//   }
// }
