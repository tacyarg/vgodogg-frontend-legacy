import React, { Component } from "react";
import "./Header.css";

import {
  Alignment,
  Button,
  AnchorButton,
  Navbar,
} from "@blueprintjs/core";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      keys: 0,
      loadingKeys: false,
      profileIsOpen: false
    };

    setInterval(this.updateKeyCount.bind(this), 10000);
  }

  componentDidMount() {
    var keys = this.props.user ? this.props.user.keyCount : 0;
    this.setState({ keys });
  }

  updateKeyCount() {
    if (!this.props.user) return;
    this.setState({
      loadingKeys: true
    });
    return this.props.callAction("getMyKeyCount").then(keys => {
      this.setState({
        keys,
        loadingKeys: false
      });
    });
  }

  render() {
    const {keys, loadingKeys} = this.state
    const { user, auth } = this.props;
    return (      
      <Navbar
      // fixedToTop="true"
      >
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading className="Header-logo">
            {/* <b> VGO Cases </b> */}
            <img alt="VGODOGG LOGO" src="https://i.imgur.com/csrxCfC.png" />
          </Navbar.Heading>
          <Navbar.Divider />
          <AnchorButton
            href="/#/cases"
            className="bp3-minimal"
            icon="box"
            text="Cases"
          />
          <AnchorButton
            href="/#/inventory"
            className="bp3-minimal"
            icon="duplicate"
            text="Inventory"
          />
          <AnchorButton
            href="/#/toplist"
            className="bp3-minimal"
            icon="chart"
            text="Toplist"
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            minimal={true}
            icon="key"
            onClick={this.updateKeyCount.bind(this)}
            text={keys}
            loading={loadingKeys}
          />
          {!user ? (
            <Button
              // className="bp3-minimal"
              intent="success"
              onClick={auth.login}
              text="Login With Steam"
            />
          ) : (
            <Button
                className="bp3-minimal"
                icon="person"
                text={user.username}
              />
          )}
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default Header;
