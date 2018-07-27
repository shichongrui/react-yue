const { Container, Vibrant } = require('gui')
const Base = require('./base')
const { shouldUpdate } = require('../utils')

module.exports = class ContainerWrapper extends Base {
  constructor(props, ele) {
    super(ele || (props.vibrant ? Vibrant.create() : Container.create()))

    this.update(null, props)
  }

  // TODO: use "lastProps" to avoid unnecessary updating
  update(lastProps, props) {
    super.update(lastProps, props)

    if (props.vibrant && !(this._ele instanceof Vibrant)) {
      this.swapViews(this._ele, Vibrant.create())
    }

    if (!props.vibrant && this._ele instanceof Vibrant) {
      this.swapViews(this._ele, Container.create())
    }

    if (props.vibrant) {
      if (shouldUpdate(props, lastProps, 'material')) {
        this._ele.setMaterial(props.material)
      }

      if (shouldUpdate(props, lastProps, 'blendingMode')) {
        this._ele.setBlendingMode(props.blendingMode)
      }
    }

    this.updateSignal('onDraw', props, lastProps)
  }

  addChildView(child) {
    this._ele.addChildView(child._ele)
  }

  removeChildView(child) {
    this._ele.removeChildView(child._ele)
  }

  insertBefore(child, beforeChild) {
    const count = this._ele.childCount()
    const targetEle = beforeChild._ele

    for (let i = 0; i < count; i += 1) {
      const ele = this._ele.childAt(i)

      if (targetEle === ele) {
        this._ele.addChildViewAt(child._ele, i)
        return
      }
    }

    this._ele.addChildView(child._ele)
  }

  swapViews = (oldView, newView) => {
    let children = []

    let childCount = oldView.childCount()
    for (let i = 0; i < childCount; i++) {
      children.push(oldView.childAt(i))
    }

    children.forEach((child) => {
      oldView.removeChildView(child)
      newView.addChildView(child)
    })

    let parent = oldView.getParent()
    let siblingCount = parent.childCount()
    let index
    for (let i = 0; i < siblingCount && !index; i++) {
      if (parent.childAt(i) === oldView) {
        index = i
      }
    }
    parent.removeChildView(oldView)
    parent.addChildViewAt(newView, index)
    this._ele = newView
  }
}
