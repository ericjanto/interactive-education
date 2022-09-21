export class InteractiveElement extends HTMLElement {
  constructor() {
    super()

    // Purpose: provide encapsulation of attribute values
    // and offer them to other objects through getters

    const validAttributeNames = ['type', 'id', 'time']
  }

  get type() {
    return this.getAttribute('type')
  }
}
