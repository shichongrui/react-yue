const { Scroll, Container } = require('gui')
const Base = require('./base')
const { warn } = require('./log')
const { shoudUpdate, win32 } = require('../utils')

module.exports = class Wrapper extends Base {
  constructor(props) {
    super(Scroll.create())

    this.contentView = Container.create()
    this.contentView.setStyle({ flex: 1 })
    this._ele.setContentView(this.contentView)

    this.update(null, props)
  }

  update(lastProps, props) {
    super.update(lastProps, props)

    if (shoudUpdate(props, lastProps, 'contentSize')) {
      this._ele.setContentSize(props.contentSize)
    }

    // TODO:
    if (props.hpolicy && props.vpolicy) {
      this._ele.setScrollbarPolicy(props.hpolicy, props.vpolicy)
    }

    if (!win32 && shoudUpdate(props, lastProps, 'overlayScrollbar')) {
      this._ele.setOverlayScrollbar(props.overlayScrollbar)
    }
  }

  addChildView(child) {
    this.contentView.addChildView(child)
    this._ele.setContentSize(this.contentView.getPreferredSize())
  }

  removeChildView(child) {
    this.contentView.removeChildView(child)
    this._ele.setContentSize(this.contentView.getPreferredSize())
  }

  insertBefore(child, beforeChild) {
    this.contentView.insertBefore(child, beforeChild)
    this._ele.setContentSize(this.contentView.getPreferredSize())
  }
}
