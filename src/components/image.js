const { Container, Image: GuiImage } = require('gui')
const Base = require('./base')
const { shouldUpdate } = require('../utils')

module.exports = class Image extends Base {
  constructor (props) {
    super(Container.create())

    this._ele.onDraw = this.draw
    this.update(null, props)
  }

  // TODO: Make it possible to change the source of
  // an image on update
  createImageView = () => {
    if (this.source.path) {
      return GuiImage.createFromPath(this.source.path)
    } else if (this.source.buffer) {
      return GuiImage.createFromBuffer(this.source.buffer, this.source.scale || 1)
    }
  }

  update (lastProps, props) {
    super.update(lastProps, {
      ...props,
      style: {
        ...props.style,
        width: props.width,
        height: props.height
      }
    })

    this.height = props.height
    this.width = props.width
    this.source = props.source

    if (shouldUpdate(props, lastProps, 'source')) {
      this.image = this.createImageView(this.source)
    }
  }

  draw = (self, painter) => {
    painter.drawImage(this.image, {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    })
  }
}