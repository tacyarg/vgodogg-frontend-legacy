import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import {
  Alignment,
  Button,
  Navbar,
  Tag,
  Popover,
  Position
} from "@blueprintjs/core"

import UserMenu from "./UserMenu";
const baseProps = { content: <UserMenu />, position: Position.BOTTOM_RIGHT };

class Header extends Component {
  render() {
    const { stats, user } = this.props

    return (
      <Navbar
      // fixedToTop="true"
      >
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>VGO Cases</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="box" text="Cases" />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Tag
            minimal={true}
            large={true}
          >
            <b>Opened:</b> {stats.allTime.cases.opened} | <b>Total Value:</b> ${stats.allTime.cases.totalValue.toFixed(2)}
          </Tag>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="notifications" text="" />
          <Popover {...baseProps} minimal={true}>
            <Button
              className="bp3-minimal" 
              // icon="user" 
              text={user.username}
              rightIcon="caret-down"
            />
          </Popover>
        </Navbar.Group>
      </Navbar>
    )
  }
}

export default Header;