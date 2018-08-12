import React, { Component } from 'react'
import './Toplist.css'
import { HTMLTable } from '@blueprintjs/core'


class Toplist extends Component {
  render() {
    var {stats} = this.props
    var topCasesAllTime = stats.allTime.top.cases
    var topCasesToday = stats.daily.top.cases

    return (
      <div className="wrapper">
          <div className="table-wrapper">
            <h1> Overall Top Openings </h1>
            <HTMLTable
              className='table-body'
              bordered={true}
              striped={true}
              // small={true}
            >
              <thead>
                <tr>
                  <th>Position</th>
                  {/* <th>Case ID</th> */}
                  <th>Offer ID</th>
                  <th>Item Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  topCasesAllTime.map((row, index) => {
                    return (
                      <tr>
                        <td>{++index}</td>
                        {/* <td>{row.case_id}</td> */}
                        <td>{row.case_site_trade_offer_id}</td>
                        <td>{row.item.name}</td>
                        <td>${(row.item.suggested_price/100).toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </HTMLTable>
          </div>

          <div className="table-wrapper">
            <h1> Todays Top Openings </h1>
            <HTMLTable
              className='table-body'
              bordered={true}
              striped={true}
              // small={true}
            >
              <thead>
                <tr>
                  <th>Position</th>
                  {/* <th>Case ID</th> */}
                  <th>Offer ID</th>
                  <th>Item Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  topCasesToday.map((row, index) => {
                    return (
                      <tr>
                        <td>{++index}</td>
                        {/* <td>{row.case_id}</td> */}
                        <td>{row.case_site_trade_offer_id}</td>
                        <td>{row.item.name}</td>
                        <td>${(row.item.suggested_price/100).toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </HTMLTable>
          </div>
      </div>
    )
  }
}

export default Toplist

