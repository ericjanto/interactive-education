class InteractiveVideo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Find (first) video within children
    const children = Array.from(this.children)
    const video = children.filter(element => element instanceof HTMLVideoElement)[0]
    console.log(video instanceof HTMLVideoElement)

    // Can play / pause like this:
    // video.play(), video.pause()
    // video.currentTime <-- might be set to duration of video before playing

    // custom event: video gets to certain time in [times]. Corner case: time exactly duration or time more than duration
    //            -> need to make sure that video is playing within the eventlistener before invoking callback
    // video.addEventListener()
  }
}

// function isPlaying(video) {
//   if (video instanceof HTMLVideoElement) {
//     return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
//   } else {
//     return false
//   }
// }

customElements.define('interactive-video', InteractiveVideo);