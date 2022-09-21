export class InteractiveElement extends HTMLElement {
  // TODO: check that valid attributes have valid values

  get time() {
    return this.getAttribute('time')
  }

  get content() {
    // Here, make an API call to retrieve content in JSON format
    return 'dummycontent'
  }
}
