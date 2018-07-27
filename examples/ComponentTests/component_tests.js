const React = require('react')
const { Component } = React
const gui = require('gui')
const { render } = require('../../src')

let win = gui.Window.create({})
win.setContentSize({ width: 1000, height: 1000 })

let contentView = gui.Container.create()
contentView.setStyle({ flexDirection: 'row' })
win.setContentView(contentView)
win.center()
win.activate()

class Test extends Component {

  constructor (props) {
    super(props)

    this.state = {
      clicked: false,
      text: '',
      submitted: false,
      hasSelected: false,
      selectedLabel: ''
    }
  }

  render () {
    return (
      <container style={{flex: 1}}>
        <scroll style={{ flex: 1 }}>
          <container style={{ padding: 50, backgroundColor: 'green' }}>
            <label style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '800',
              fontStyle: 'italic'
            }}
              text='This is some text'
            />
          </container>
          <container style={{ padding: 50, height: 500 }}>
            <button title='This is a button' onClick={() => this.setState({ clicked: true })} />
            {this.state.clicked && <label text='You clicked it!' />}
          </container>
          <container style={{ padding: 50, height: 500 }}>
            <entry onTextChange={(e) => this.setState({ text: e.getText() })} onActivate={() => this.setState({ submitted: true })}/>
            <label text={`Text: ${this.state.text}`} />
            {this.state.submitted && <label text='Submitted!' />}
          </container>
          <container style={{ padding: 50 }}>
            <image source={{ path: './examples/ComponentTests/300x200.jpg' }} width={300} height={200} />
          </container>
          {/* <container style={{ padding: 50 }}>
            <menu
              label={this.state.hasSelected ? this.state.selectedLabel : 'Press for a menu'}
              onChange={(e) => this.setState({ hasSelected: true, selectedLabel: e.getLabel() })}
            >
              <menu-item label='This is an item' />
              <menu-item type='seperator' />
              <menu-item type='checkbox' label='Check me' />
            </menu>
          </container> */}
          <container style={{ padding: 50 }}>
            <progressbar value={40} />
          </container>
          <container style={{ padding: 50 }}>
            <image
              style={{ position: 'absolute', top: 50, left: 50 }}
              source={{ path: './examples/ComponentTests/300x200.jpg' }}
              width={300}
              height={200}
            />
            <container vibrant material='dark' blendingMode='within-window' style={{ padding: 50, height: 200 }}>
              <label text='This text be on something vibrant' />
            </container>
          </container>
          {/* <container>
            <browser style={{ height: 400 }} url='https://google.com' />
          </container> */}
        </scroll>
      </container>
    )
  }
}

render(<Test />, contentView)
