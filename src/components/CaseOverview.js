import React, { Component } from 'react'
import '../styles/CaseOverview.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ItemCard from '../components/ItemCard'
import utils from '../libs/utils'
import { sortBy, sumBy } from 'lodash'
import CountUp from 'react-countup';
import { Button, Intent } from '@blueprintjs/core'
import OpenCase from '../components/OpenCase'


class CaseOverview extends Component {
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
    const { box, stats } = this.props
    box.items = sortBy(box.items, 'suggested_price').reverse()
    return (
      <div className="CaseOverview-wrapper">
        <div className="CaseOverview-header">
          <div className="CaseOverview-header-content">
            <img 
              className="CaseOverview-caseImage" 
              src={box.image['300px']} 
              alt={box.name} 
            />
            <div className="CaseOverview-details">
              <span className="CaseOverview-details-caseName">{box.name}</span>
              <span className="CaseOverview-details-caseValue">
                <b>Times Opened:</b> <CountUp end={stats.opened || 0} />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Total Won:</b> <CountUp
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={stats.totalValue} 
                />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Average ROI:</b> <CountUp
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={stats.totalValue / stats.opened} 
                />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Best Item:</b> {box.bestItem.name} - <CountUp 
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={box.bestItem.suggested_price/100} 
                />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Worst Item:</b> {box.worstItem.name} - <CountUp 
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={box.worstItem.suggested_price/100} 
                />
              </span>
            </div>
          </div>
          <div className="CaseOverview-buy">
              <OpenCase 
                isOpen={this.state.isOpen} 
                handleClose={this.closeDialog.bind(this)}
                box={box}
                buyCases={this.sendKeyRequest.bind(this)}
              />
              <Button 
                className="CaseOverview-buyButton"
                large={true}
                intent={Intent.SUCCESS}
                text="PURCHASE CASE"
                icon="cart"
                onClick={e => {
                  this.openDialog()
                }}
              />
            </div>
        </div>
        <div className="CaseOverview-body">
          <div className="CaseOverview-body-title">
           This case contains {box.items.length} items valued at <CountUp 
                prefix="$" 
                separator="," 
                decimals={2} 
                end={sumBy(box.items, 'suggested_price')/100} 
              />
          </div>
          <ReactCSSTransitionGroup
            className="CaseOverview-body-caseItems"
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {
              box.items.map(item => {
                item = utils.processItem(item)
                return (
                  <ItemCard 
                    key={item.id}
                    {...item}
                  />
                )
              })
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default CaseOverview

