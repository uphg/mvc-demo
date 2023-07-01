import { compile } from "handlebars"
import { createElement } from "./utils"
import { Emitter } from './emitter'

export class Module extends Emitter {
  constructor(options) {
    super()
    Object.assign(this, options)
    this.el = this.render()
    this.mount()
    this.on('changed', () => {
      this.update()
    })
  }
  render() {
    const html = compile(this.template)(this.model.data)
    const el = createElement(html)
    this.bindEvents(el)
    return el
  }
  bindEvents(el) {
    const keys = Object.keys(this.events)
    keys.forEach(key => {
      const modelKey = this.events[key]
      const eventName = key.match(/^[a-z]+/)[0]
      const selector = key.slice(eventName.length).trim()
      el.addEventListener(eventName, (e) => {
        if (e.target.matches(selector)) {
          this.model[modelKey].call(this, e)
        }
      })
    })
  }
  mount() {
    this.container.append(this.el)
  }
  update() {
    const newEl = this.render()
    this.el.replaceWith(newEl)
    this.el = newEl
  }
}
