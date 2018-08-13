import React, { Component } from 'react'
import '../styles/Loading.css'

import { Spinner } from '@blueprintjs/core'


class Loading extends Component {
  render() {
    return (
      <div className="Loading-main">
        <Spinner 
          className="Loading-loader"
        />

        {/* <div className="loader">
        </div> */}
      </div>
    )
  }
}

export default Loading