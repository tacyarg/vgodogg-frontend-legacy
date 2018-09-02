import React, { Component } from "react";


class Home extends Component {
  render() {
    var { callAction } = this.props

    return (
      <div className="home">
        {this.props.history.push(`/cases`)}
      </div>
    );
  }
}

export default Home;
