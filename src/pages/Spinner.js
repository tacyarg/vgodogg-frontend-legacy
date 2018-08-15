import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import CountUp from 'react-countup';

import '../styles/Spinner.css'
import {random, shuffle, concat, sample, clone} from 'lodash'
import { Button, Card, Elevation, Intent } from '@blueprintjs/core'
import uuid from 'uuid/v4'
import items from '../libs/caseItems'
import ItemCard from '../components/ItemCard'
import utils from '../libs/utils'

class Spinner extends Component {
  constructor(props) {
    super()

    this.state = {
      items: props.cases[props.match.params.boxid].items,
      pendingBoxes: [],
      speed: 4,
      itemWidth: 220,
      winningItemIndex: 100,
      offset: 0,
      disabled: false,

      spinnerTransition: '',
      spinnerTransform: '',
      spinnerContent: [],
      winnerElevation: Elevation.ONE,
      spinning: false,
      itemsWon: [],
      totalWon: 0
    }
  }

  componentDidMount() {
    this.props.callAction('getOfferCases',{
      offerid: this.props.match.params.offerid
    }).then(pendingBoxes => {
      pendingBoxes = pendingBoxes.filter(box => !box.done)
      if(pendingBoxes.length === 0) {
        this.props.history.push(`/pending`)
      }
      this.setState({pendingBoxes})
      this.setup.bind(this)()
    })
  }

  setCaseOpened() {
    this.props.callAction('openMyCase', {
      caseid: this.state.currentCase.id
    })
  }

  shuffleSpinnerItems(caseItems, times) {
    times = times || 1
    var limit = caseItems.length * times;
    var spinnerArray = [];
    while(spinnerArray.length < limit){
      spinnerArray = concat(spinnerArray, caseItems)
    }
    return shuffle(spinnerArray)
  }

  setup() {
    var {winningItemIndex, itemWidth, pendingBoxes } = this.state

    var spinnerContent = this.state.items.map(utils.processItem)
    spinnerContent = spinnerContent.filter(item => {
      return item.category.indexOf('Knife') === -1
    })
    spinnerContent = this.shuffleSpinnerItems(spinnerContent, 3)

    var currentCase = pendingBoxes.pop()
    var offset = random(-50, 50) + itemWidth * 2

    if(!currentCase) {
      this.setState({
        disabled: true
      })
      return
    }

    var winner = utils.processItem(currentCase.item)
    winner.selected = true;
    spinnerContent.splice(winningItemIndex, 1, winner)

    this.setState({
      spinnerContent,
      currentCase,
      offset,
      winner,
      winnerElevation: null,
      spinnerTransition: '',
      spinnerTransform: `translateX(-180px) translateZ(0px)`,
    })
  }

  spin() {
    var { winner, winningItemIndex, speed, itemWidth, offset } = this.state
    if(!winner) return

    setTimeout(() => {
      this.setState({
        spinning: true,
        spinnerTransition: `all ${speed}s ease`,
        spinnerTransform: `translateX(${winningItemIndex * -itemWidth + offset}px) translateZ(0px)`
      })
    }, 500)

    setTimeout(() => {
      this.state.itemsWon.unshift(winner)
      this.state.totalWon += winner.suggested_price / 100
      this.setState({ winnerElevation: Elevation.FOUR })
      this.setCaseOpened.bind(this)()

      setTimeout(() => {
        this.setState({ spinning: false })
        this.setup.bind(this)()
      }, 1000)
    }, (speed + .5) * 1000)
  }

  render() {
    var { items } = this.props
    return (
      <div className="Spinner-wrapper">
        <div className="Spinner-bounding">
          <div className="Spinner-inner">
            <div className="Spinner-tick"></div>
            <div className="Spinner-overlay-left"></div>
            <div className="Spinner-overlay-right"></div>
            <div className="Spinner-content" style={{
              transition: this.state.spinnerTransition,
              transform: this.state.spinnerTransform
            }}>
              {
                this.state.spinnerContent.map(item => {
                  return (
                    <ItemCard 
                      elevation={item.selected ? this.state.winnerElevation : null}
                      {...item}
                    />
                  )
                })
              }
            </div>
          </div>
          <Button 
            loading={this.state.spinning}
            intent={Intent.SUCCESS}
            disabled={this.state.disabled}
            className="Spinner-btn" 
            onClick={e => {
              this.spin.bind(this)()
            }} 
            text="spin"
          />
        </div>
        <div>
          <ReactCSSTransitionGroup
            className="Spinner-itemsWon"
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            <span className="Spinner-itemsWon-Title">
              Items Unboxed: <CountUp prefix="$" separator="," decimals={2} end={this.state.totalWon} />
            </span>
            {
              this.state.itemsWon.map(item => {
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

export default Spinner

