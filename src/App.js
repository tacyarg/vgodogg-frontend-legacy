import React, { Component } from "react";
import "./App.css";
import "./styles/Animations.css";
import { Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";
import OpeningFeed from "./components/OpeningFeed/OpeningFeed";

// PAGES
import Cases from "./pages/Cases/Cases";
import CaseOverview from "./pages/CaseOverview/CaseOverview";

import PendingCases from "./pages/Cases/PendingCases";
import Spinner from "./pages/SpinCase/SpinCase";

import Home from "./pages/Home";
import Inventory from "./pages/Inventory/Inventory";

import Toplist from "./pages/Toplist/Toplist";

class App extends Component {
  constructor(props) {
    super();
    this.state = props.serverState();
    props.serverState.on("change", obj => this.setState(obj));
  }

  render() {
    var { auth, user, callAction, AppToaster } = this.props;

    return (
      <div className="App-wrapper">
        <Header
          stats={this.state.stats}
          user={user}
          auth={auth}
          callAction={callAction}
        />
        <Chat
          messages={this.state.chats["en"].messages}
          user={user}
          callAction={callAction}
          stats={this.state.stats}
        />
        <OpeningFeed recentOpenings={this.state.recentOpenings} boxes={this.state.cases}/>
        <div className="App-content">
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Home
                  {...props}
                  callAction={callAction}
                  stats={this.state.stats}
                  cases={this.state.cases}
                />
              );
            }}
          />

          <Route
            path="/cases"
            render={props => {
              return (
                <Cases
                  {...props}
                  user={user}
                  AppToaster={AppToaster}
                  callAction={callAction}
                  cases={this.state.cases}
                  stats={this.state.stats}
                />
              );
            }}
          />
          <Route
            path="/overview/:boxid"
            render={props => {
              return (
                <CaseOverview
                  {...props}
                  AppToaster={AppToaster}
                  callAction={callAction}
                  boxes={this.state.cases}
                  stats={this.state.stats}
                />
              );
            }}
          />

          <Route
            path="/pending"
            render={props => {
              return (
                <PendingCases
                  {...props}
                  user={user}
                  AppToaster={AppToaster}
                  callAction={callAction}
                  cases={this.state.cases}
                  stats={this.state.stats}
                />
              );
            }}
          />
          <Route
            path="/opening/:boxid/:offerid"
            render={props => {
              return (
                <Spinner
                  {...props}
                  user={user}
                  AppToaster={AppToaster}
                  callAction={callAction}
                  cases={this.state.cases}
                  stats={this.state.stats}
                />
              );
            }}
          />

          <Route
            path="/inventory"
            render={props => {
              return (
                <Inventory
                  {...props}
                  user={user}
                  AppToaster={AppToaster}
                  callAction={callAction}
                  cases={this.state.cases}
                  stats={this.state.stats}
                />
              );
            }}
          />

          <Route
            path="/toplist"
            render={props => {
              return (
                <Toplist
                  {...props}
                  callAction={callAction}
                  stats={this.state.stats}
                />
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
