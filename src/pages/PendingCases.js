import React, { Component } from 'react'
import '../styles/Cases.css'
import CaseCardUser from '../components/CaseCardUser'

import {groupBy, map, clone} from 'lodash'
import { Spinner } from '@blueprintjs/core'

var intervalLoop = null

class PendingCases extends Component {

  constructor(props) {
    super()

    this.state = {
      offerCases: []
    }

    intervalLoop = setInterval(this.getPendingCases.bind(this), 10000)
  }

  componentDidMount() {
    this.getPendingCases.bind(this)()
  }

  componentWillUnmount() {
    // cancel set interval 
    clearInterval(intervalLoop)
  }

  getPendingCases() {
    if(!this.props.user) return
    this.props.callAction('getMyPendingCases').then(boxes => {

      var offerCases = groupBy(boxes, 'case_site_trade_offer_id')

      offerCases = map(offerCases, (cases, key) => {
        var firstCase = cases[0]
        var box = clone(this.props.cases[--firstCase.case_id])
        box.offerid = key
        box.name = `Order #${key}`
        box.cases = cases
        return box
      })


      this.setState({
        offerCases: offerCases
      })
    })
  }

  render() {
    return (
      <div className="Cases-wrapper">
        {
          this.state.offerCases.length > 0 ? map(this.state.offerCases, box => {
            return (
              <CaseCardUser
                onClick={e => {
                  this.props.history.push(`/opening/${box.id}/${box.offerid}`)
                }}
                box={box}
              />
            )
          }) : <div>
            <h1>You have no pending case openings!</h1>
            <Spinner 
              className="Cases-loading"
            />
          </div>
        }
      </div>
    )
  }
}

export default PendingCases

