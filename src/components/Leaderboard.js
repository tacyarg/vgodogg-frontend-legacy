import React, { Component } from 'react'
import '../styles/Leaderboard.css'
import { HTMLTable } from '@blueprintjs/core'
import moment from 'moment'

class Leaderboard extends Component {
  render() {
    var {stats} = this.props
    var topCases = stats.top.cases
    return (
      <div className="Leaderboard-table-wrapper">
        <h1> {stats.name.toUpperCase()} Top Openings </h1>
        <HTMLTable
          className='Leaderboard-table-body'
          bordered={true}
          striped={true}
          // small={true}
        >
          <thead>
            <tr>
              {/* <th>Position</th> */}
              <th>Time</th>
              <th>User</th>
              <th>Item</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {
              topCases.map((row, index) => {
                return (
                  <tr>
                    {/* <td>{++index}</td> */}
                    <td>{moment(row.created).fromNow()}</td>
                    <td>{row.user.username}</td>
                    <td>{row.item.name}</td>
                    <td>${(row.item.suggested_price/100).toFixed(2)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </HTMLTable>
      </div>
    )
  }
}

export default Leaderboard