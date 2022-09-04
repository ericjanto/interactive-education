class InteractiveVideo extends HTMLElement {
  // TODO: check if you actually need to call constructor()
    constructor() {
        // Always call super first in constructor
        super();

        // Find (first) video within children
        const children = Array.from(this.children)
        const video = children.filter(element => element.tagName == 'VIDEO')[0]
        console.log(video)
    
        // Find out when you can play / pause
        // Can play / pause like this:
        // video.play(), video.pause()

        // Find out how to get played duration of video
      }
}

customElements.define('interactive-video', InteractiveVideo);