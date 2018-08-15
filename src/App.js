import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header'
import Chat from './components/Chat'
import OpeningFeed from './components/OpeningFeed'

// PAGES
import Cases from './pages/Cases'
import CaseOverview from './pages/CaseOverview'

import Home from './pages/Home'
import Toplist from './pages/Toplist'

class App extends Component {
  constructor(props){
    super()
    this.state = props.serverState()
    props.serverState.on('change', obj => this.setState(obj))
  }

  render() {
    var {auth, user, callAction, AppToaster } = this.props

    return (
      <div className="App">
        <Header stats={this.state.stats} user={user} auth={auth} callAction={callAction} />
        <Chat messages={this.state.chats['en'].messages} callAction={callAction} stats={this.state.stats} />
        <OpeningFeed recentOpenings={this.state.recentOpenings} />
        <div className="main-content">
            <Route exact path="/" render={props => {
              return (<Home {...props} callAction={callAction} stats={this.state.stats} cases={this.state.cases}/>)
            }}/>
            <Route path="/cases" render={props => {
              return (<Cases {...props} AppToaster={AppToaster} callAction={callAction} cases={this.state.cases} stats={this.state.stats} />)
            }}/>
            <Route path="/overview" render={props => {
              return (<CaseOverview {...props} AppToaster={AppToaster} callAction={callAction} boxes={this.state.cases} stats={this.state.stats}/>)
            }}/>
            <Route path="/toplist" render={props => {
              return (<Toplist {...props} callAction={callAction} stats={this.state.stats} />)
            }}/>
        </div>
      </div>
    )
  }
}

export default App
