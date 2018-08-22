import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import CountUp from 'react-countup';

import '../styles/Spinner.css'
import {random, shuffle, concat, sortBy, clone} from 'lodash'
import { Checkbox, Button, HTMLSelect, Elevation, Intent, ControlGroup } from '@blueprintjs/core'
import uuid from 'uuid/v4'
import items from '../libs/caseItems'
import ItemCard from '../components/ItemCard'
import utils from '../libs/utils'
import {LazyLoadComponent, LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'


const FILTER_OPTIONS = [
  "Unboxed: last",
  "Unboxed: first",
  "Price: ascending", 
  "Price: descending"
]

class Spinner extends Component {
  constructor(props) {
    super()

    var boxid = --props.match.params.boxid

    this.state = {
      box: props.cases[boxid],
      items: props.cases[boxid].items,
      pendingBoxes: [],
      speed: 4,
      itemWidth: 180,
      winningItemIndex: 100,
      offset: 0,
      disabled: false,
      totalBoxes: 0,
      autoSpin: false,
      sortFilter: "Unboxed: last",

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
    }).then(boxes => {
      boxes = sortBy(boxes, ['item', 'id']).reverse()

      var itemsWon = boxes.filter(box => box.done)
        .map(box => utils.processItem(box.item))

      var pendingBoxes = boxes.filter(box => !box.done)

      this.setState({itemsWon, pendingBoxes, totalBoxes: boxes.length})
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
      return item.category.indexOf('Covert') === -1 && 
              item.category.indexOf('Knife') === -1 &&
              item.category.indexOf('Legendary') === -1
    })
    spinnerContent = this.shuffleSpinnerItems(spinnerContent, 2)

    var currentCase = pendingBoxes.pop()
    var offset = random(-50, 50) + itemWidth * 1.4
    // var offset = itemWidth * 1.4

    if(!currentCase) {
      this.setState({
        disabled: true
      })
    } else {
      var winner = utils.processItem(currentCase.item)
      winner.selected = true;
      spinnerContent.splice(winningItemIndex, 1, winner)
    }

    this.setState({
      spinnerContent,
      currentCase,
      offset,
      winner,
      winnerElevation: null,
      spinnerTransition: '',
      spinnerTransform: `translateX(-180px) translateZ(0px)`,
    })

    if(currentCase && this.props.user) {
      if(currentCase.userid === this.props.user.id) return
      this.setState({
        spinning: false,
        disabled: true
      })
    } else {
      this.setState({
        spinning: false,
        disabled: true
      })
    }
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
      // var wonSorted = this.sortItems(this.state.itemsWon, this.state.sortFilter)
      // this.setState({itemsWon: wonSorted})

      this.state.totalWon += winner.suggested_price / 100
      this.setState({ winnerElevation: Elevation.FOUR })
      this.setCaseOpened.bind(this)()

      setTimeout(() => {
        this.setup.bind(this)()

        if(this.state.autoSpin) {
          this.spin.bind(this)()
        } else {
          this.setState({ spinning: false })
        }
      }, 1000)
    }, (speed + .5) * 1000)
  }

  sortItems(items, filter) {
    switch(filter) {
      case "Unboxed: first":
        return sortBy(items, 'id')
      case "Unboxed: last":
        return sortBy(items, 'id').reverse()
      case "Price: ascending":
        return sortBy(items, 'suggested_price')
      case "Price: descending":
        return sortBy(items, 'suggested_price').reverse()
      default:
        return items
    }
  }

  render() {
    var { items } = this.props
    return (
      <div className="Spinner-wrapper">
        <div className="Spinner-title">
          <h1>{this.state.box.name}</h1>
        </div>
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
                this.state.spinnerContent.map((item, index) => {
                  return (
                    <ItemCard 
                      key={item.id + index}
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
        <div className="Spinner-itemsWon-content">
          <span className="Spinner-itemsWon-Title">
            <div className="Spinner-itemsWon-Title-left">
              {this.state.itemsWon.length} / {this.state.totalBoxes} Items Unboxed: <CountUp prefix="$" separator="," decimals={2} end={this.state.totalWon} />
            </div>
            <ControlGroup
              className="Spinner-itemsWon-Title-right"
            >
              <Checkbox 
                className="Spinner-autospin"
                checked={this.state.autoSpin} 
                label="Auto Spin" 
                onChange={e => {
                  this.state.autoSpin ? this.setState({autoSpin: false}) : this.setState({autoSpin: true})
                }} 
              />
              <HTMLSelect 
                minimal={true}
                options={FILTER_OPTIONS}
                onChange={event => {
                  var items = this.sortItems(this.state.itemsWon, event.currentTarget.value)
                  this.setState({
                    itemsWon: items,
                    sortFilter: event.currentTarget.value
                  })
                }}
                value={this.state.sortFilter}
              />
            </ControlGroup>

          </span>
          <ReactCSSTransitionGroup
            className="Spinner-itemsWon"
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
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

