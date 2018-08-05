import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import {
  Alignment,
  Button,
  Navbar,
  Tag
} from "@blueprintjs/core"

class Header extends Component {
  render() {
    const { stats } = this.props

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
          <Button className="bp3-minimal" icon="user"></Button>
          <Button className="bp3-minimal" icon="notifications"></Button>
          <Button className="bp3-minimal" icon="cog"></Button>
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default Header;