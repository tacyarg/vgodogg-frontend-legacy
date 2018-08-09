import React, { Component } from 'react'
import './Cases.css'
import { Card, Elevation } from '@blueprintjs/core'
import OpenCase from '../components/OpenCase'

class Cases extends Component {
  constructor(props) {
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

  sendKeyRequest(caseid, amount) {
    console.log(caseid, amount)
    return this.props.callAction('createCaseOpenOffer', {
      caseid, amount
    }).then(offer => {
      if(!offer) return
      this.props.AppToaster.show({
        action: {
          href: offer.url,
          target: "_blank",
          text: <strong>View Offer</strong>,
      },
        intent: 'success',
        message: `Successfully created offer!`
      })
      this.closeDialog() 
    })
  }

  render() {
    const { cases, stats } = this.props
    console.log(this.props)
    return (
      <div className="cases">
        <OpenCase 
          isOpen={this.state.isOpen} 
          handleClose={this.closeDialog.bind(this)}
          box={this.state.selectedBox}
          buyCases={this.sendKeyRequest.bind(this)}
          // maxKeys={user.keyCount}
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
                <div className="case-opened"><b>Total Opened:</b> { stats.allTime.cases[box.id] ? stats.allTime.cases[box.id].opened : 0 }</div>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default Cases

