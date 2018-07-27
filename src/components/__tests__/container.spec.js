const React = require('react')
const gui = require('gui')
const { createTestSuite } = require('./utils')
const { win32 } = require('../../utils')

describe('container', () => {
  it('should render the component correctly', done => {
    createTestSuite(render => {
      const title = 'hello'
      const checked = true
      const image = gui.Image.createFromBuffer(Buffer.alloc(0), 1)

      const ele = (
        <container
          title={title}
          checked={checked}
          defaultChecked={checked}
          image={image}
        />
      )

      render(ele, _container => {
        const container = _container.childAt(0)
        expect(container instanceof gui.Container).toBeTruthy()
        done()
      })
    })
  })

  it('can render a vibrant view', (done) => {
    if (win32) return done()
    createTestSuite(render => {
      const material = 'dark'
      const blendingMode = 'behind-window'

      const ele = (
        <container
          vibrant
          material={material}
          blendingMode={blendingMode}
        />
      )

      render(ele, container => {
        const vibrant = container.childAt(0)
        expect(vibrant instanceof gui.Vibrant).toBeTruthy()
        expect(vibrant.getMaterial()).toBe(material)
        expect(vibrant.getBlendingMode()).toBe(blendingMode)
        done()
      })
    })
  })
})
