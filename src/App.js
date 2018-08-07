import React, { Component } from 'react'
import './App.css'
import { fromCallback } from 'bluebird'
import State from './libs/state'
import openSocket from 'socket.io-client'
import Auth from './libs/auth'
// import { debounce } from 'lodash'
import axios from 'axios'

import Header from './components/Header'
import Chat from './components/Chat'
import Feed from './components/Feed'
import Cases from './components/Cases'
import AppToaster from './components/AppToaster'

const API_URL = 'https://api.vunbox.com'
const SOCKET_URL = 'https://socket.vunbox.com'
const serverState = State()
const socket = openSocket(SOCKET_URL)
const auth = Auth(socket)


class App extends Component {

  constructor() {
    super();
    this.state = {
      stats: {
        allTime: {
          cases: {
            totalValue: 0,
            opened: 0
          }
        }
      },
      chats: {
        'en': {
          messages: []
        }
      },
      recentOpenings: [],
      user: null,
      cases: [],
      notifications: []
    }

    // listen for changes
    socket.on('diff', serverState.patch)
    serverState.on('change', obj => this.setState(obj))

    auth.verifySteam()
    .catch(err => {
      // 
    })
    .then(auth.setToken)
    .then(user => {
      console.log(user)
      this.setState({user})
    })
  }

  componentDidMount() {
    // setup initial app state
    axios.get(`${API_URL}/getServerState`).then(resp => {
      serverState.set(null, resp.data)
    })
  }

  callAction(action, params, done) {
    return fromCallback(function(done){
      socket.emit('action', action, params, done)
    }).catch(err => {
      AppToaster.show({
        intent: 'danger',
        message: err.message
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header stats={this.state.stats} user={this.state.user} auth={auth} />
        <Chat messages={this.state.chats['en'].messages} callAction={this.callAction}  />
        <Feed recentOpenings={this.state.recentOpenings} />
        <div className="main-content">
          <Cases cases={this.state.cases} />
        </div>
      </div>
    )
  }
}

export default App
