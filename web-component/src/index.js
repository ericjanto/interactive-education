import { InteractiveElement } from './InteractiveElement'
import { InteractiveVideo } from './InteractiveVideo'

export { InteractiveElement }
export { InteractiveVideo }

window.customElements.define('interactive-element', InteractiveElement)
window.customElements.define('interactive-video', InteractiveVideo)
