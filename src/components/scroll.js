const { Scroll, Container } = require('gui')
const Base = require('./base')
const { shouldUpdate, win32 } = require('../utils')

module.exports = class ScrollWrapper extends Base {
  constructor(props) {
    super(Scroll.create())

    this.contentView = Container.create()
    this.contentView.setStyle({ flex: 1 })
    this._ele.setContentView(this.contentView)

    this.update(null, props)
  }

  update(lastProps, props) {
    super.update(lastProps, props)

    this._ele.setContentSize(this.contentView.getPreferredSize())

    // TODO:
    if (props.hpolicy && props.vpolicy) {
      this._ele.setScrollbarPolicy(props.hpolicy, props.vpolicy)
    }

    if (!win32 && shouldUpdate(props, lastProps, 'overlayScrollbar')) {
      this._ele.setOverlayScrollbar(props.overlayScrollbar)
    }
  }

  // I'm not sure why it is the case here and not anywhere else but
  // in the case of Scroll these next 3 methods were losing their
  // scoping so making them class properties and arrow functions
  // will ensure they don't lose their scope
  addChildView = (child) => {
    this.contentView.addChildView(child._ele)
    this._ele.setContentSize(this.contentView.getPreferredSize())
  }

  removeChildView = (child) => {
    this.contentView.removeChildView(child._ele)
    this._ele.setContentSize(this.contentView.getPreferredSize())
  }

  insertBefore = (child, beforeChild) => {
    this.contentView.insertBefore(child._ele, beforeChild._ele)
    this._ele.setContentSize(this.contentView.getPreferredSize())
  }
}
