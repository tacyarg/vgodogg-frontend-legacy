import React, { Component } from 'react'
import '../styles/Cases.css'
import CaseCard from '../components/CaseCard'
import { AnchorButton, Intent } from '@blueprintjs/core'

class Cases extends Component {
  render() {
    const { cases, stats } = this.props
    return (
      <div className="Cases-wrapper">
        <div className="Cases-header">
          <AnchorButton 
            href="/#/pending"
            // icon="folder-open" 
            large={true}
            text="My Pending Cases" 
            intent={Intent.SUCCESS}
            rightIcon="arrow-right"
          />
        </div>
        <div className="Cases-body">
          {cases.map(box => {
            var boxStats = stats.allTime.cases[box.id]
            box.openCount = boxStats ? boxStats.opened : 0
            return (
              <CaseCard
                key={box.id}
                onClick={e => {
                  this.props.history.push(`/overview/${box.id}`)
                }}
                box={box}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Cases

