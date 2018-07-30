const { Menu } = require('gui')
const Base = require('./Base')

module.exports = class Menu extends Base {
  static defaultProps = {
    label: ''
  }

  constructor (props, root) {
    super(props, root)
    this.props = {
      ...Menu.defaultProps,
      ...props
    }

    this.view = gui.Button.create(this.props.label)
    this.view.onClick = () => this.menu.popup()
    this.menu = gui.Menu.create([])
    this.applyProps()
  }

  applyProps = () => {
    applyStyles(this.view, this.props.style)

    this.view.setTitle(this.props.label)
  }

  // the menu items are handled in a different way than
  // just as children of the view
  appendChild(child) {
    this.menu.append(child.view)
    child.view.onClick = this.onChange
  }

  removeChild(child) {
    this.menu.remove(child.view)
  }

  insertBefore(parentInstance, child, beforeChild) {
    let index
    let count = this.menu.itemCount()
    for (let i = 0; i < count && !index; i++) {
      let view = this.menu.itemAt(i)
      if (view === beforeChild.view) {
        index = i
      }
    }
    if (index) {
      this.menu.insert(child.view, index)
      child.view.onClick = this.onChange
    }
  }

  onChange = (e) => {
    if (!this.props.onChange) return
    this.props.onChange(e)
  }
}