import React, { Component } from "react";

import Modal from "../components/Modal/Modal";

class Home extends Component {
  render() {
    var { callAction } = this.props

    return (
      <div className="home">
        {/* {this.props.history.push(`/cases`)} */}

        <Modal callAction={callAction} />
      </div>
    );
  }
}

export default Home;
