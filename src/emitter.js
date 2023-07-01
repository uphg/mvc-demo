export class Emitter {
  events = {}
  on(name, fn) {
    const e = this.events
    e[name] = e[name] ?? []
    e[name].push(fn)
  }
  once(name, fn) {
    const listener = (...args) => {
      this.off(name, listener)
      fn(...args)
    }
    listener._ = fn
    this.on(name, listener)
  }
  emit(name, ...args) {
    const e = this.events
    e[name]?.forEach(fn => fn(...args))
  }
  off(name, fn) {
    const e = this.events
    e[name] = fn ? e[name].filter(item => item !== fn && item._ !== fn) : []
  }
}