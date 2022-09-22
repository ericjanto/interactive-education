export class InteractiveElement extends HTMLElement {
    // TODO: check that valid attributes have valid values

    get timestamp() {
        return this.getAttribute('timestamp')
    }

    get content() {
        // Here, make an API call to retrieve content in JSON format
        return 'dummycontent'
    }
}
