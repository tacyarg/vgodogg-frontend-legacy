import React, { Component } from 'react'
import '../styles/CaseOverview.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ItemCard from '../components/ItemCard'
import utils from '../libs/utils'
import { sortBy, sumBy } from 'lodash'
import CountUp from 'react-countup';
import { Button, Intent } from '@blueprintjs/core'
import OpenCase from '../components/OpenCaseModal'
import {LazyLoadComponent, LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'

class CaseOverview extends Component {
  constructor(props) {
    super()

    console.log(props)

    var box = props.boxes[parseInt(--props.match.params.boxid)]
    console.log(box)
    box.items = sortBy(box.items, 'suggested_price').reverse()
    var stats = props.stats.allTime.cases[box.id]
    this.state = {
      isOpen: false,
      selectedBox: {},
      stats: stats || { opened: 0, totalValue: 0 }, 
      box
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
        message: `Successfully created offer!`,
        timeout: 30*1000
      })
      this.props.history.push(`/pending`)
      this.closeDialog() 
    })
  }

  render() {    
    return (
      <div className="CaseOverview-wrapper">
        <div className="CaseOverview-header">
          <div className="CaseOverview-header-content">
            <img 
              className="CaseOverview-caseImage" 
              src={this.state.box.image['300px']} 
              alt={this.state.box.name} 
            />
            <div className="CaseOverview-details">
              <span className="CaseOverview-details-caseName">{this.state.box.name}</span>
              <span className="CaseOverview-details-caseValue">
                <b>Times Opened:</b> <CountUp end={this.state.stats.opened} />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Total Won:</b> <CountUp
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={this.state.stats.totalValue} 
                />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Average ROI:</b> <CountUp
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={this.state.stats.totalValue / this.state.stats.opened} 
                />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Best Item:</b> {this.state.box.bestItem.name} - <CountUp 
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={this.state.box.bestItem.suggested_price/100} 
                />
              </span>
              <span className="CaseOverview-details-caseValue">
                <b>Worst Item:</b> {this.state.box.worstItem.name} - <CountUp 
                  prefix="$" 
                  separator="," 
                  decimals={2} 
                  end={this.state.box.worstItem.suggested_price/100} 
                />
              </span>
            </div>
          </div>
          <div className="CaseOverview-buy">
              <OpenCase 
                isOpen={this.state.isOpen} 
                handleClose={this.closeDialog.bind(this)}
                box={this.state.box}
                buyCases={this.sendKeyRequest.bind(this)}
              />
              <Button 
                className="CaseOverview-buyButton"
                large={true}
                intent={Intent.PRIMARY}
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
           This case contains {this.state.box.items.length} items valued at <CountUp 
                prefix="$" 
                separator="," 
                decimals={2} 
                end={sumBy(this.state.box.items, 'suggested_price')/100} 
              />
          </div>
          <ReactCSSTransitionGroup
            className="CaseOverview-body-caseItems"
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {
              this.state.box.items.map(item => {
                item = utils.processItem(item)
                return (
                  <LazyLoadComponent key={item.id}>
                    <ItemCard 
                      // key={item.id}
                      {...item}
                    />
                  </LazyLoadComponent>
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

