import React, { Component } from "react";
import CountUp from "react-countup";

const Stats = () => {
  return (
    <div className="Profile-content-body-panel">
      <div className="stats">
        <div className="stat">
          <div className="stat-figure">
            <CountUp separator="," end={453} />
          </div>
          <div className="stat-label">Total Opened</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <CountUp prefix="$" separator="," decimals={2} end={4235.23} />
          </div>
          <div className="stat-label">Total Rewarded</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <CountUp prefix="$" separator="," decimals={2} end={1235.33} />
          </div>
          <div className="stat-label">Total Spent</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
