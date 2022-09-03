class InteractiveVideo extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    
        // Find (first) video within children
        // const video = this.children
        // Can play / pause like this:
        // video.play(), video.pause()
      }
}

customElements.define('interactive-video', InteractiveVideo);