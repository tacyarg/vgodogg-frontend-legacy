import React, { Component } from 'react'
import '../styles/Toplist.css'
import Leaderboard from '../components/Leaderboard'

class Toplist extends Component {
  render() {
    var {stats} = this.props
    return (
      <div className="Toplist-wrapper">
        <div className="Toplist-content">
          <Leaderboard stats={stats.allTime} />
          <Leaderboard stats={stats.monthly} />
          <Leaderboard stats={stats.weekly} />
          <Leaderboard stats={stats.daily} />
        </div>
      </div>
    )
  }
}

export default Toplist

