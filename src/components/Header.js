import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../styles/Header.css'

import {
  Alignment,
  Button,
  AnchorButton,
  Navbar,
  Tag,
  Popover,
  Position
} from "@blueprintjs/core"

import UserMenu from "./UserMenu";

class Header extends Component {
  constructor() {
    super()
    this.state = {
      keys: 0,
      loadingKeys: false
    }

    setInterval(this.updateKeyCount.bind(this), 10000)
  }

  componentDidMount() {
    var keys = this.props.user ? this.props.user.keyCount : 0
    this.setState({keys})
  }

  updateKeyCount() {
    if(!this.props.user) return
    this.setState({
      loadingKeys: true
    })
    return this.props.callAction('getMyKeyCount').then(keys => {
      this.setState({
        keys,
        loadingKeys: false
      })
    })
  }

  render() {
    const { stats, user, auth } = this.props
    const baseProps = { content: <UserMenu auth={auth} />, position: Position.BOTTOM_RIGHT };
    return (
      <Navbar
      // fixedToTop="true"
      >
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading className="Header-logo">
            {/* <b> VGO Cases </b> */}
            <img src="https://i.imgur.com/csrxCfC.png" />
          </Navbar.Heading>
          <Navbar.Divider />
          {/* <AnchorButton 
            href="/#/"
            className="bp3-minimal" 
            icon="home" 
            text="Home" 
          /> */}
          <AnchorButton 
            href="/#/cases"
            className="bp3-minimal" 
            icon="box" 
            text="Cases" 
          />
          <AnchorButton 
            href="/#/pending"
            className="bp3-minimal" 
            icon="box" 
            text="Pending" 
          />
          <AnchorButton 
            href="/#/toplist"
            className="bp3-minimal" 
            icon="chart" 
            text="Toplist" 
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {/* <Navbar.Divider /> */}
          {/* <Tag
            minimal={true}
            interactive={true}
            large={true}
            icon="key"
            onClick={this.updateKeyCount.bind(this)}
            text={ this.state.keys }
          /> */}
          <Button
            minimal={true}
            icon="key"
            onClick={this.updateKeyCount.bind(this)}
            text={ this.state.keys }
            loading={this.state.loadingKeys}
          />
          {/* <Button className="bp3-minimal" icon="notifications" text="" /> */}
          {
            (!user) ?
              (<Button
                // className="bp3-minimal" 
                intent="success"
                onClick={auth.login}
                text="Login With Steam"
              />) :
              (<Popover {...baseProps} minimal={true}>
                <Button
                  className="bp3-minimal" 
                  icon="person" 
                  text={user.username}
                  rightIcon="caret-down"
                />
              </Popover>)
          }
        </Navbar.Group>
      </Navbar>
    )
  }
}

export default Header;