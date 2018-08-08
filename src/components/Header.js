import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

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
      keys: 0
    }

    setInterval(this.updateKeyCount.bind(this), 5000)
  }

  componentDidMount() {
    var keys = this.props.user ? this.props.user.keyCount : 0
    this.setState({keys})
  }

  updateKeyCount() {
    return this.props.callAction('getMyKeyCount').then(keys => {
      this.setState({keys})
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
          <Navbar.Heading>VGO Cases</Navbar.Heading>
          <Navbar.Divider />
          <AnchorButton 
            href="/#/"
            className="bp3-minimal" 
            icon="home" 
            text="Home" 
          />
          <AnchorButton 
            href="/#/cases"
            className="bp3-minimal" 
            icon="box" 
            text="Cases" 
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Tag
            minimal={true}
            large={true}
          >
            <b>Opened:</b> {stats.allTime.cases.opened} <b>Total Value:</b> ${stats.allTime.cases.totalValue.toFixed(2)}
          </Tag>
          <Navbar.Divider />
          <Tag
            minimal={true}
            interactive={true}
            large={true}
            icon="key"
            onClick={this.updateKeyCount.bind(this)}
          >
            { this.state.keys }
          </Tag>
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