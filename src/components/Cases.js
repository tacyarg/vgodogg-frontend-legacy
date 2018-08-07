import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Cases.css'
import { Card, Elevation } from '@blueprintjs/core'

class Cases extends Component {

  SendKeyRequest(caseid) {
    console.log("Clicked Case:", caseid)
  }

  render() {
    const { cases } = this.props
    return (
      <div className="cases">
        {cases.map(box => {
          return (
            <Card 
              key={box.id}
              className="case"
              interactive={true} 
              elevation={Elevation.TWO}
              onClick={e => this.SendKeyRequest(box.id)}
            >
              <div className="name">{box.name}</div>
              <img className="case-image" src={box.image['300px']} alt={box.name} />
              <div className="case-opened"><b>Total Opened:</b> 100,524,999</div>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default Cases

