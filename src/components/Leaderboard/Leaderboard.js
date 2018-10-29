import React, { Component } from 'react'
import './Leaderboard.css'
import { HTMLTable } from '@blueprintjs/core'
import moment from 'moment'
import CountUp from 'react-countup'

import { deepEquals } from 'lodash'
import Modal from '../Modal/Modal'
import Profile from '../Profile/Profile'

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalContent: null,
      modalProps: null,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps)
    return true
    // return deepEquals(nextProps.stats.cases, this.props.stats.cases);
  }

  // MODAL FUNCTIONS

  openModal = (component, props = {}) => {
    // if not component is provided, just toggle.
    if (component) {
      this.setState({
        modalContent: component,
        modalProps: props,
      })
    }

    this.modal.toggleOverlay()
  }

  openProfile = userid => {
    this.openModal(Profile, { userid })
  }

  render() {
    var { stats, auth, callAction, serverState } = this.props
    var { modalContent, modalProps } = this.state
    var topCases = stats.top.cases
    return (
      <div className="Leaderboard-table-wrapper bp3-dark">
        <Modal
          {...modalProps}
          onRef={ref => (this.modal = ref)}
          InnerComponent={modalContent}
          auth={auth}
          callAction={callAction}
          serverState={serverState}
          onSubmit={this.openModal}
        />
        <div className="Leaderboard-table-header">
          <div className="Leaderboard-table-header-left">
            <h1> {stats.name.toUpperCase()} Top Openings </h1>
            {stats.name === 'allTime' ? (
              <h4>∞ to ∞</h4>
            ) : (
              <h4>
                {moment(stats.start).calendar() +
                  ' to ' +
                  moment(stats.end).calendar()}
              </h4>
            )}
          </div>
          <div className="Leaderboard-table-header-right">
            <h4>Opened: {stats.cases.opened.toLocaleString()}</h4>
            <h4>Rewarded: {stats.cases.totalValue.toLocaleString()}</h4>
          </div>
        </div>

        <HTMLTable
          interactive={true}
          className="Leaderboard-table-body"
          style={{ color: 'white', background: '#182026' }}
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
            {topCases.map((row, index) => {
              return (
                <tr
                  onClick={e => {
                    this.openProfile(row.user.id)
                  }}
                  key={index}
                >
                  {/* <td>{++index}</td> */}
                  <td>{moment(row.created).calendar()}</td>
                  <td>{row.user.username}</td>
                  <td>{row.item.name}</td>
                  <td>${(row.item.suggested_price / 100).toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </HTMLTable>
      </div>
    )
  }
}

export default Leaderboard
