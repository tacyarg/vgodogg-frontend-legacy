import React, { Component } from 'react'
import './App.css'

import { Route } from 'react-router-dom';

import Header from './components/Header'
import Chat from './components/Chat'
import Feed from './components/Feed'

// PAGES
import Cases from './pages/Cases'
import Home from './pages/Home'

class App extends Component {
  constructor(props){
    super()
    this.state = props.serverState()
    props.serverState.on('change', obj => this.setState(obj))
  }

  render() {
    var {auth, user, callAction } = this.props

    return (
      <div className="App">
        <Header stats={this.state.stats} user={user} auth={auth} />
        <Chat messages={this.state.chats['en'].messages} callAction={callAction}  />
        <Feed recentOpenings={this.state.recentOpenings} />
        <div className="main-content">
          <Route exact path="/" component={Home} />
          <Route path="/cases" render={props => {
            return (<Cases {...props} cases={this.state.cases} stats={this.state.stats} />)
          }} />
        </div>
      </div>
    )
  }
}

export default App
