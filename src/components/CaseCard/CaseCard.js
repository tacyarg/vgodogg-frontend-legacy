import React, { Component } from 'react'
import './CaseCard.css'
import { Card, Elevation } from '@blueprintjs/core'
import utils from "../../libs/utils";

class CaseCard extends Component {
  render() {
    var { box } = this.props
    return (
      <div className="CaseCard-wrapper">
        <Card
          key={box.id}
          interactive={true}
          elevation={Elevation.ONE}
          className="CaseCard-card"
          {...this.props}
        >
          <div className="CaseCard-content">
            <div className="CaseCard-title">{box.name}</div>
            <img
              className="CaseCard-image"
              src={box.image['300px']}
              alt={box.name}
            />

            <div className="CaseCard-animation">
              <div className="CaseCard-animation-content">
                {box.items.map(item => {
                  item = utils.processItem(item);
                  if (item.condition !== "Factory New") return;
                  return (
                    <div className="CaseCard-animation-content-item">
                      <div className="CaseCard-animation-content-item-image">
                        <img src={item.image['300px']}></img>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="CaseCard-opened">
              <b>Total Opened:</b> {box.openCount}
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default CaseCard
