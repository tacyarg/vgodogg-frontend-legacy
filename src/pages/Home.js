import React, { Component } from 'react'

import Spinner from '../components/Spinner'

class Home extends Component {
  render() {
    var box = this.props.cases[3]
    var stats = this.props.stats.allTime.cases[box.id]
    return (
      <div className="home">
        <Spinner />
      </div>
    )
  }
}

export default Home

