import React, { Component } from "react";
import classNames from "classnames";

import "./Modal.css";
import { Classes, Button, Overlay } from "@blueprintjs/core";
import Profile from "../Modals/Profile/Profile";

const classes = classNames(
  Classes.CARD,
  Classes.ELEVATION_4,
  "Modal-overlay"
);

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modal: "Profile"
    };
  }

  toggleOverlay() {
    this.state.isOpen
      ? this.setState({ isOpen: false })
      : this.setState({ isOpen: true });
  }

  render() {
    var { user, callAction, isOpen, toggleOverlay } = this.props;
    return (
      <div className="Modal-wrapper">
        {/* <Button
          style={{ float: "right" }}
          large={true}
          text="Show overlay"
          onClick={this.toggleOverlay.bind(this)}
        /> */}
        <Overlay
          autoFocus={false}
          hasBackdrop={false}
          isOpen={isOpen || this.state.isOpen}
          onClose={toggleOverlay || this.toggleOverlay.bind(this)}
        >
          <div className={classes}>
            <Profile showNavbar={true} user={user} callAction={callAction}/>
          </div>
        </Overlay>
      </div>
    );
  }
}

export default Modal;
