import React, { Component } from 'react'
import './Toplist.css'
import Leaderboard from '../../components/Leaderboard/Leaderboard'

import { Navbar, Tab, Tabs } from '@blueprintjs/core'
import { map, orderBy, keyBy } from 'lodash'

class Toplist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLeaderboard: 'allTime',
    }
  }

  handleNavbarTabChange = e => {
    this.setState({ selectedLeaderboard: e })
  }

  render() {
    var { selectedLeaderboard } = this.state
    var { stats } = this.props
    stats = orderBy(stats, 'created')
    stats = keyBy(stats, 'name')

    return (
      <div className="Toplist-wrapper">
        <Navbar className="bp3-dark Toplist-navbar">
          <Tabs
            animate={true}
            large={true}
            onChange={this.handleNavbarTabChange}
            selectedTabId={this.state.selectedLeaderboard}
          >
            {map(stats, (data, key) => {
              return <Tab key={key} id={key} title={key.toUpperCase()} />
            })}
          </Tabs>
        </Navbar>
        <div className="Toplist-content">
          <Leaderboard {...this.props} stats={stats[selectedLeaderboard]} />
        </div>

        {/* <Leaderboard stats={stats.allTime} />
          <Leaderboard stats={stats.monthly} />
          <Leaderboard stats={stats.weekly} />
          <Leaderboard stats={stats.daily} /> */}
      </div>
    )
  }
}

export default Toplist
