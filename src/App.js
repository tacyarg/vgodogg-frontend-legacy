import React, { Component } from 'react';
import './App.css';

import State from './libs/state'
import openSocket from 'socket.io-client';
// import { debounce } from 'lodash'
import axios from 'axios'

import Header from './components/Header'
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

  render() {
    return (
      <div className="App">
        <Header stats={this.state.stats} />
        <Feed recentOpenings={this.state.recentOpenings} />
        <div className='main'>
          some case
        </div>
      </div>
    );
  }
}

export default App;
