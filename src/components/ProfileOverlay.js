import React, { Component } from "react";
import "../styles/ProfileOverlay.css";
import { Overlay } from "@blueprintjs/core";

class ProfileOverlay extends Component {
  constructor(props) {
    super();

    this.state = {
      isOpen: true
    };
  }

  toggleOverlay() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }

  render() {
    var { toggleOverlay, isOpen } = this.props;

    return (
      <Overlay isOpen={this.state.isOpen} onClose={this.toggleOverlay}>
        Overlaid contents...
      </Overlay>
    );
  }
}

export default ProfileOverlay;
