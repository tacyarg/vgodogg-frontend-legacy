import React, { Component } from "react";
import classNames from "classnames";

import "./Modal.css";
import { Classes, Button, Overlay } from "@blueprintjs/core";
import Profile from "../Modals/Profile/Profile";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      modal: "Profile"
    };
  }

  toggleOverlay() {
    this.state.isOpen
      ? this.setState({ isOpen: false })
      : this.setState({ isOpen: true });
  }

  render() {
    const classes = classNames(
      Classes.CARD,
      Classes.ELEVATION_4,
      "Modal-overlay"
    );
    var { user, callAction } = this.props;
    return (
      <div className="Modal-wrapper">
        <Button
          style={{ float: "right" }}
          large={true}
          text="Show overlay"
          onClick={this.toggleOverlay.bind(this)}
        />
        <Overlay
          isOpen={this.state.isOpen}
          onClose={this.toggleOverlay.bind(this)}
        >
          <div className={classes}>
            <Profile user={user} callAction={callAction} />
          </div>
        </Overlay>
      </div>
    );
  }
}

export default Modal;
