import React, { Component } from 'react'
import '../styles/Toplist.css'
import { HTMLTable } from '@blueprintjs/core'
import moment from 'moment'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Toplist extends Component {
  render() {
    var {stats} = this.props
    var topCasesAllTime = stats.allTime.top.cases
    var topCasesToday = stats.daily.top.cases

    return (
      <div className="Toplist-wrapper">
        <div className="Toplist-content">

          <div className="Toplist-table-wrapper">
            <h1> Overall Top Openings </h1>
            <HTMLTable
              className='Toplist-table-body'
              bordered={true}
              striped={true}
              // small={true}
            >
              <thead>
                <tr>
                  {/* <th>Position</th> */}
                  <th>Time</th>
                  <th>Offer ID</th>
                  <th>Item Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <ReactCSSTransitionGroup
                component="tbody"
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {
                  topCasesAllTime.map((row, index) => {
                    return (
                      <tr>
                        {/* <td>{++index}</td> */}
                        <td>{moment(row.created).fromNow()}</td>
                        <td>{row.case_site_trade_offer_id}</td>
                        <td>{row.item.name}</td>
                        <td>${(row.item.suggested_price/100).toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
              </ReactCSSTransitionGroup>
            </HTMLTable>
          </div>

          <div className="Toplist-table-wrapper">
            <h1> Todays Top Openings </h1>
            <HTMLTable
              className='Toplist-table-body'
              bordered={true}
              striped={true}
              // small={true}
            >
              <thead>
                <tr>
                  {/* <th>Position</th> */}
                  <th>Time</th>
                  <th>Offer ID</th>
                  <th>Item Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <ReactCSSTransitionGroup
                component="tbody"
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >        
                {
                  topCasesToday.map((row, index) => {
                    return (
                      <tr>
                        {/* <td>{++index}</td> */}
                        <td>{moment(row.created).fromNow()}</td>
                        <td>{row.case_site_trade_offer_id}</td>
                        <td>{row.item.name}</td>
                        <td>${(row.item.suggested_price/100).toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
              </ReactCSSTransitionGroup>
            </HTMLTable>
          </div>

        </div>
      </div>
    )
  }
}

export default Toplist

