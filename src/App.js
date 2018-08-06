import React, { Component } from 'react';
import './App.css';
import { fromCallback } from 'bluebird'
import State from './libs/state'
import openSocket from 'socket.io-client';
// import { debounce } from 'lodash'
import axios from 'axios'

import Header from './components/Header'
import Chat from './components/Chat'
import Feed from './components/Feed'

const API_URL = 'https://api.vunbox.com'
const SOCKET_URL = 'https://socket.vunbox.com'
const serverState = State()
const socket = openSocket(SOCKET_URL);

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
      recentOpenings: []
    }

    // listen for changes
    socket.on('diff', serverState.patch)
    serverState.on('change', obj => this.setState(obj))
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
    }).catch(err => console.error(action, err.message))
  }

  render() {
    return (
      <div className="App">
        <Header stats={this.state.stats} />
        <Chat messages={this.state.chats['en'].messages} callAction={this.callAction}  />
        <Feed recentOpenings={this.state.recentOpenings} />
      </div>
    );
  }
}

export default App;
