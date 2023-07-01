import { Module } from './module'
import './style.css'

const app = document.querySelector('#app')

// MV*
new Module({
  // Model
  model: {
    data: {
      count: 0
    },
    add() {
      this.model.data.count += 1
      this.emit('changed')
    },
    minus() {
      this.model.data.count -= 1
      this.emit('changed')
    }
  },

  // View
  container: app,
  events: {
    'click .b1': 'add',
    'click .b2': 'minus'
  },
  template: `
    <div>
      <div>{{ count }}</div>
      <div>
        <button class="b1">+1</button>
        <button class="b2">-1</button>
      </div>
    </div>
  `
})