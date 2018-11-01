import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CountUp from 'react-countup'

import './SpinCase.css'
import { random, shuffle, concat, sortBy } from 'lodash'
import {
  Checkbox,
  Button,
  HTMLSelect,
  Elevation,
  Intent,
  ControlGroup,
} from '@blueprintjs/core'
import ItemCard from '../../components/ItemCard/ItemCard'
import utils from '../../libs/utils'

const FILTER_OPTIONS = [
  'Unboxed: last',
  'Unboxed: first',
  'Price: ascending',
  'Price: descending',
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
      itemWidth: 200,
      winningItemIndex: 100,
      offset: 0,
      disabled: false,
      totalBoxes: 0,
      autoSpin: false,
      sortFilter: 'Unboxed: last',
      quickSpin: false,

      spinnerTransition: '',
      spinnerTransform: '',
      spinnerContent: [],
      winnerElevation: Elevation.ONE,
      spinning: false,
      itemsWon: [],
      totalWon: 0,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState
  }

  componentDidMount() {
    this.props
      .callAction('getOfferCases', {
        offerid: this.props.match.params.offerid,
      })
      .then(boxes => {
        boxes = sortBy(boxes, ['item', 'id']).reverse()

        var itemsWon = boxes
          .filter(box => box.done)
          .map(box => utils.processItem(box.item))

        var pendingBoxes = boxes.filter(box => !box.done)

        this.setState({ itemsWon, pendingBoxes, totalBoxes: boxes.length })
        this.setup.bind(this)()
      })
  }

  setCaseOpened() {
    this.props.callAction('openMyCase', {
      caseid: this.state.currentCase.id,
    })
  }

  shuffleSpinnerItems(caseItems, times) {
    times = times || 1
    var limit = caseItems.length * times
    var spinnerArray = []
    while (spinnerArray.length < limit) {
      spinnerArray = concat(spinnerArray, caseItems)
    }
    return shuffle(spinnerArray)
  }

  setup() {
    var { winningItemIndex, itemWidth, pendingBoxes } = this.state

    var spinnerContent = this.state.items.map(utils.processItem)
    spinnerContent = spinnerContent.filter(item => {
      return (
        item.category.indexOf('Covert') === -1 &&
        item.category.indexOf('Knife') === -1 &&
        item.category.indexOf('Legendary') === -1
      )
    })
    spinnerContent = this.shuffleSpinnerItems(spinnerContent, 2)

    var currentCase = pendingBoxes.pop()
    var offset = -itemWidth * 2.7 + random(-50, 50)

    if (!currentCase) {
      this.setState({
        disabled: true,
      })
    } else {
      var winner = utils.processItem(currentCase.item)
      winner.selected = true
      spinnerContent.splice(winningItemIndex, 1, winner)
    }

    this.setState({
      spinnerContent,
      currentCase,
      offset,
      winner,
      winnerElevation: null,
      spinnerTransition: '',
      // spinnerTransform: `translateX(-180px) translateZ(0px)`
      spinnerTransform: `translate3d(-180px, 0, 0)`,
    })

    if (currentCase && this.props.user) {
      if (currentCase.userid === this.props.user.id) return
      this.setState({
        spinning: false,
        disabled: true,
      })
    } else {
      this.setState({
        spinning: false,
        disabled: true,
      })
    }
  }

  spin(quickSpin) {
    var { winner, winningItemIndex, speed, itemWidth, offset } = this.state
    if (!winner) return
    var doneDelay = 1000

    if (quickSpin) {
      speed = speed / 3
    }

    setTimeout(() => {
      this.setState({
        spinning: true,
        spinnerTransition: `all ${speed}s ease`,
        spinnerTransform: `translate3d(${winningItemIndex * -itemWidth +
          offset}px, 0, 0)`,
        // spinnerTransform: `translateX(${(winningItemIndex * -itemWidth) + offset}px) translateZ(0px)`
      })
    }, 500)

    setTimeout(() => {
      this.state.itemsWon.unshift(winner)
      this.setState({
        totalWon: this.state.totalWon + winner.suggested_price / 100,
        winnerElevation: Elevation.FOUR,
      })
      this.setCaseOpened.bind(this)()

      setTimeout(() => {
        this.setup.bind(this)()

        if (this.state.autoSpin) {
          this.spin.bind(this)()
        } else {
          this.setState({ spinning: false })
        }
      }, doneDelay)
    }, (speed + 0.5) * doneDelay)
  }

  sortItems(items, filter) {
    switch (filter) {
      case 'Unboxed: first':
        return sortBy(items, 'id')
      case 'Unboxed: last':
        return sortBy(items, 'id').reverse()
      case 'Price: ascending':
        return sortBy(items, 'suggested_price')
      case 'Price: descending':
        return sortBy(items, 'suggested_price').reverse()
      default:
        return items
    }
  }

  render() {
    return (
      <div className="Spinner-wrapper">
        <div className="Spinner-title">
          <h1>{this.state.box.name}</h1>
        </div>
        <div className="Spinner-bounding">
          <div className="Spinner-inner">
            <div className="Spinner-tick" />
            <div className="Spinner-overlay-left" />
            <div className="Spinner-overlay-right" />
            <div
              className="Spinner-content"
              style={{
                transition: this.state.spinnerTransition,
                transform: this.state.spinnerTransform,
              }}
            >
              {this.state.spinnerContent.map((item, index) => {
                return (
                  <ItemCard
                    key={item.id + index}
                    style={{
                      color: 'white',
                      background: '#182026',
                      border: `${
                        item.selected && this.state.winnerElevation > 1
                          ? '1px solid gold'
                          : ''
                      }`,
                    }}
                    elevation={
                      item.selected ? this.state.winnerElevation : null
                    }
                    {...item}
                  />
                )
              })}
            </div>
          </div>
          <div className="Spinner-btn-wrapper">
            <Button
              loading={this.state.spinning}
              intent={Intent.PRIMARY}
              disabled={this.state.disabled}
              className="Spinner-btn"
              onClick={e => {
                this.spin.bind(this)()
              }}
              text="Spin"
            />
            <Button
              // style={{backgroundColor:"goldenrod"}}
              rightIcon="fast-forward"
              loading={this.state.spinning}
              disabled={this.state.disabled}
              className="Spinner-btn-fast bp3-dark"
              onClick={e => {
                this.spin.bind(this)(true)
              }}
              text="Fast"
            />
          </div>
        </div>
        <div className="Spinner-itemsWon-content">
          <span className="Spinner-itemsWon-Title">
            <div className="Spinner-itemsWon-Title-left">
              {this.state.itemsWon.length} / {this.state.totalBoxes} Items
              Unboxed:{' '}
              <CountUp
                prefix="$"
                separator=","
                decimals={2}
                end={this.state.totalWon}
              />
            </div>
            <ControlGroup className="Spinner-itemsWon-Title-right bp3-dark">
              <Checkbox
                className="Spinner-autospin"
                checked={this.state.autoSpin}
                label="Auto Spin"
                onChange={e => {
                  this.state.autoSpin
                    ? this.setState({ autoSpin: false })
                    : this.setState({ autoSpin: true })
                }}
              />
              <HTMLSelect
                minimal={true}
                options={FILTER_OPTIONS}
                onChange={event => {
                  var items = this.sortItems(
                    this.state.itemsWon,
                    event.currentTarget.value
                  )
                  this.setState({
                    itemsWon: items,
                    sortFilter: event.currentTarget.value,
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
            {this.state.itemsWon.map(item => {
              return <ItemCard key={item.id} {...item} />
            })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Spinner
