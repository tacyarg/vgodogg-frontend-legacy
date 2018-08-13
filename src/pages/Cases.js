import React, { Component } from 'react'
import '../styles/Cases.css'
import { Card, Elevation, Tab, Tabs } from '@blueprintjs/core'
import OpenCase from '../components/OpenCase'
import CaseCard from '../components/CaseCard'

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
          var boxStats = stats.allTime.cases[box.id]
          box.openCount = boxStats ? boxStats.opened : 0
          return (
            <CaseCard
              onClick={e => this.triggerModal(box)}
              box={box}
            />
          )
        })}
      </div>
    )
  }
}

export default Cases

