import React, { Component } from "react";

import Modal from "../components/Modal/Modal";

class Home extends Component {
  render() {
    return (
      <div className="home">
        {this.props.history.push(`/cases`)}

        {/* <Modal /> */}
      </div>
    );
  }
}

export default Home;
