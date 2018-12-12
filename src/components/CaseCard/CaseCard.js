import React, { PureComponent } from 'react'
import './CaseCard.css'
import { Card, Elevation } from '@blueprintjs/core'
import utils from '../../libs/utils'
import { sampleSize } from 'lodash'

class CaseCard extends PureComponent {
  render() {
    var { box } = this.props
    return (
      <div className="CaseCard-wrapper">
        <Card
          style={{ color: 'white', background: '#182026' }}
          // key={box.id}
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
                {sampleSize(box.items, 50).map(item => {
                  item = utils.processItem(item)
                  return (
                    <div
                      key={item.id}
                      className="CaseCard-animation-content-item"
                    >
                      <div className="CaseCard-animation-content-item-image">
                        <img src={item.image['300px']} />
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
