import React, { Component } from "react";
import "./Header.css";

import {
  Alignment,
  Button,
  AnchorButton,
  Navbar,
} from "@blueprintjs/core";

import Modal from "../Modal/Modal";
import Profile from '../Profile/Profile'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      keys: 0,
      loadingKeys: false,
      profileIsOpen: false,
      modalContent: null
    };

    setInterval(this.updateKeyCount.bind(this), 5000);
  }

  componentDidMount() {
    this.updateKeyCount.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  updateKeyCount() {
    if (!this.props.user) return 0;
    this.setState({
      loadingKeys: true
    });
    return this.props.callAction("getMyKeyCount").then(keys => {
      this.setState({
        keys,
        loadingKeys: false
      });
    }).catch(err => {});
  }

  // MODAL FUNCTIONS

  openModal = component => {
    // if not component is provided, just toggle.
    if (component) {
      this.setState({
        modalContent: component
      });
    }

    this.modal.toggleOverlay();
  };

  openProfile = () => {
    this.openModal(Profile);
  };

  render() {
    const { keys, loadingKeys, modalContent } = this.state
    const { user, auth, serverState, callAction } = this.props;
    return (
      <div>
        <Modal
          onRef={ref => (this.modal = ref)}
          InnerComponent={modalContent}
          auth={auth}
          callAction={callAction}
          serverState={serverState}
          onSubmit={this.openModal}
        />
        <Navbar
          className="bp3-dark"
          style={{ color: 'white', background: '#10161A' }}
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
              // loading={loadingKeys}
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
                  onClick={this.openProfile}
                />
              )}
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default Header;
