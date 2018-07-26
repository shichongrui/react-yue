const React = require('react')
const gui = require('gui')
const { createTestSuite } = require('./utils')

describe('image', () => {
  it('should render the component correctly', done => {
    createTestSuite(render => {
      const ele = (
        <image
          width={50}
          height={50}
          source={{
            buffer: Buffer.alloc(0)
          }}
        />
      )

      render(ele, container => {
        const image = container.childAt(0)
        expect(image instanceof gui.Container).toBeTruthy()
        done()
      })
    })
  })
})
