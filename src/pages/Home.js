import React, { Component } from 'react'

// import Spinner from '../components/Spinner'
import CaseOverview from '../components/CaseOverview'

class Home extends Component {
  render() {
    var box = this.props.cases[3]
    var stats = this.props.stats.allTime.cases[box.id]
    return (
      <div className="home">
        {/* <Spinner /> */}
          <CaseOverview box={box} stats={stats}/>
      </div>
    )
  }
}

export default Home

