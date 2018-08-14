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
      items: [],
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
    setTimeout(() => {
      this.spin.bind(this)()
    }, 1000)
  }

  generateSpinnerContent(caseItems, times) {
    times = times || 1
    var limit = caseItems.length * times;
    var spinnerArray = [];
    while(spinnerArray.length < limit){
      spinnerArray = concat(spinnerArray, caseItems)
    }
    return shuffle(spinnerArray)
  }

  spin(speed, filterCovert) {
    filterCovert = filterCovert || false
    speed = speed || 4
    var itemWidth = 220
    var winningItemIndex = random(150, 200);
    var offset = random(-50, 50) + itemWidth * 2

    console.log('offset', offset)

    this.setState({
      winnerElevation: null,
      spinnerTransition: '',
      spinnerTransform: `translateX(-180px) translateZ(0px)`
    })

    var spinnerItems = items.map(utils.processItem)
    spinnerItems = spinnerItems.filter(item => {
      return item.category.indexOf('Knife') === -1
    })
    var content = this.generateSpinnerContent(spinnerItems, 3)
    var winner = clone(sample(items))
    winner = utils.processItem(winner)
    winner.selected = true;
    content.splice(winningItemIndex, 1, winner)

    this.setState({spinnerContent: content})

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
      this.setState({
        spinning: false,
        winnerElevation: Elevation.FOUR
      })
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

