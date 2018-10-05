import React, { Component } from "react";
import "./Cases.css";
import CaseCard from "../../components/CaseCard/CaseCard";
import { AnchorButton, Intent } from "@blueprintjs/core";

const CaseList = ({ cases, stats, history }) => {
  return cases.map(box => {
    var boxStats = stats.allTime.cases[box.id];
    box.openCount = boxStats ? boxStats.opened : 0;
    return (
      <CaseCard
        key={box.id}
        onClick={e => history.push(`/overview/${box.id}`)}
        box={box}
      />
    );
  });
};

class Cases extends Component {
  render() {
    const { cases, stats, user, history } = this.props;
    return (
      <div className="Cases-wrapper">
        <div className="Cases-header">
          <AnchorButton
            disabled={!user}
            href="/#/pending"
            large={true}
            text="My Pending Cases"
            intent={Intent.SUCCESS}
            rightIcon="arrow-right"
          />
        </div>
        <div className="Cases-body">
          <CaseList history={history} cases={cases} stats={stats} />
        </div>
      </div>
    );
  }
}

export default Cases;
