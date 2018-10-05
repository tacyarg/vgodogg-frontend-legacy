import React, { Component } from "react";


class Home extends Component {
  render() {
    return (
      <div className="home">
        {this.props.history.push(`/cases`)}
      </div>
    );
  }
}

export default Home;
