import React, { Component } from "react";
import "../styles/Leaderboard.css";
import { HTMLTable } from "@blueprintjs/core";
import moment from "moment";
import CountUp from "react-countup";

class Leaderboard extends Component {
  render() {
    var { stats } = this.props;
    var topCases = stats.top.cases;
    return (
      <div className="Leaderboard-table-wrapper">
        <div className="Leaderboard-table-header">
          <div className="Leaderboard-table-header-left">
            <h1> {stats.name.toUpperCase()} Top Openings </h1>
            {stats.name === "allTime" ? (
              <h4>∞ to ∞</h4>
            ) : (
              <h4>
                {moment(stats.start).calendar() +
                  " to " +
                  moment(stats.end).calendar()}
              </h4>
            )}
          </div>
          <div className="Leaderboard-table-header-right">
            <h4>
              Opened: <CountUp end={stats.cases.opened} />
            </h4>
            <h4>
              Rewarded:{" "}
              <CountUp
                prefix="$"
                separator=","
                decimals={2}
                end={stats.cases.totalValue}
              />
            </h4>
          </div>
        </div>

        <HTMLTable
          className="Leaderboard-table-body"
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
                <tr key={index}>
                  {/* <td>{++index}</td> */}
                  <td>{moment(row.created).calendar()}</td>
                  <td>{row.user.username}</td>
                  <td>{row.item.name}</td>
                  <td>${(row.item.suggested_price / 100).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </HTMLTable>
      </div>
    );
  }
}

export default Leaderboard;
