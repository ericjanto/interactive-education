export class InteractiveElement extends HTMLElement {
    get timestamp() {
        return this.getAttribute('timestamp')
    }
}
