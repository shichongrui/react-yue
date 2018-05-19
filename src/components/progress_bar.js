const { ProgressBar } = require('gui')
const Base = require('./base')

module.exports = class Wrapper extends Base {
  constructor(props) {
    super(ProgressBar.create())

    this.update(null, props)
  }

  update(lastProps, props) {
    super.update(lastProps, props)

    if (props.value) {
      this._ele.setValue(props.value)
    }

    if (props.indeterminate) {
      this._ele.setIndeterminate(props.indeterminate)
    }

    this.updateSignal('onClick', props, lastProps)
  }
}
