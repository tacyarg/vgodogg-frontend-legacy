import React, { Component } from 'react'

import Spinner from '../components/Spinner'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Spinner />
      </div>
    )
  }
}

export default Home