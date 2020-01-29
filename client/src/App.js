import React, { Component } from 'react'
import sockerIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      endpoint: 'localhost:4001',
      color: 'white',
    }
  }

  // sending sockets
  send = () => {
    const socket = sockerIOClient(this.state.endpoint)
    socket.emit('change color', this.state.color)
  }

  // adding the function
  setColor = color => {
    this.setState({ color })
  }

  componentDidMount = () => {
    const socket = sockerIOClient(this.state.endpoint)
    setInterval(this.send(), 1000)
    socket.on('change color', col => {
      document.body.style.backgroundColor = col
    })
  }

  render() {
    const socket = sockerIOClient(this.state.endpoint)
    socket.on('change color', col => {
      document.body.style.backgroundColor = col
    })

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => this.send()}>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor('red')}>
          Red
        </button>
      </div>
    )
  }
}

export default App
