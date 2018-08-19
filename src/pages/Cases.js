import React, { Component } from 'react'
import '../styles/Cases.css'
import CaseCard from '../components/CaseCard'

class Cases extends Component {
  render() {
    const { cases, stats } = this.props
    return (
      <div className="Cases-wrapper">
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
    )
  }
}

export default Cases

