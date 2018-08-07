import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Cases.css'
import { Card, Elevation } from '@blueprintjs/core'
import OpenCase from './OpenCase'

class Cases extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      selectedBox: {}
    }
  }

  openDialog() {
    this.setState({isOpen: true})
  }

  closeDialog() {
    this.setState({isOpen: false})
  }

  triggerModal(box) {
    console.log("Clicked Case:", box.id)
    this.setState({selectedBox: box})
    this.openDialog()
  }

  sendKeyRequest() {

  }

  render() {
    const { cases } = this.props
    return (
      <div className="cases">
        <OpenCase 
          isOpen={this.state.isOpen} 
          handleClose={this.closeDialog.bind(this)}
          box={this.state.selectedBox}
          buyCases={this.sendKeyRequest}
        />
        {cases.map(box => {
          return (
            <Card 
              key={box.id}
              className="case"
              interactive={true} 
              elevation={Elevation.TWO}
              onClick={e => this.triggerModal(box)}
            >
              <div className='content'>
                <div className="name">{box.name}</div>
                <img className="case-image" src={box.image['300px']} alt={box.name} />
                <div className="case-opened"><b>Total Opened:</b> 100,524,999</div>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default Cases

