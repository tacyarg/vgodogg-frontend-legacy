import React, { Component } from 'react'
import '../styles/Cases.css'
import CaseCardUser from '../components/CaseCardUser'

import {groupBy, map, clone} from 'lodash'

class PendingCases extends Component {

  constructor(props) {
    super()

    this.state = {
      offerCases: []
    }
  }

  componentDidMount() {
    if(!this.props.user) return
    this.props.callAction('getMyPendingCases').then(boxes => {

      var offerCases = groupBy(boxes, 'case_site_trade_offer_id')
      console.log(offerCases)

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
          }) : <h1>You have no pending case openings!</h1>
        }
      </div>
    )
  }
}

export default PendingCases

