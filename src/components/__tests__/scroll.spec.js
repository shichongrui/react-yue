const React = require('react')
const gui = require('gui')
const { createTestSuite } = require('./utils')
const { win32 } = require('../../utils')

describe('scroll', () => {
  it('should render the component correctly', done => {
    createTestSuite(render => {
      const overlayScrollbar = true
      const hpolicy = 'never'
      const vpolicy = 'always'
      const containerSize = { width: 100, height: 100 }

      const ele = (
        <scroll
          overlayScrollbar={overlayScrollbar}
          hpolicy={hpolicy}
          vpolicy={vpolicy}
        >
          <container style={containerSize} />
        </scroll>
      )

      render(ele, container => {
        const scroll = container.childAt(0)
        expect(scroll instanceof gui.Scroll).toBeTruthy()
        const size = scroll.getContentSize()
        // NOTE: The value may be not accurate in windows
        if (!win32) {
          // The content size should be determined by the scroll views
          // children
          expect(size.width).toBe(containerSize.width)
          expect(size.height).toBe(containerSize.height)
        }
        // expect(scroll.isOverlayScrollbar()).toBe(overlayScrollbar)
        const policies = scroll.getScrollbarPolicy()
        expect(policies[0]).toBe(hpolicy)
        // TODO: not work for vpolicy
        // expect(policies[1]).toBe(vpolicy)
        done()
      })
    })
  })
})
