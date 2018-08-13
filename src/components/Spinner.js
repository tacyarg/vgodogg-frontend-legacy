import React, { Component } from 'react'
import './Spinner.css'
import {random, shuffle, concat, sample, clone} from 'lodash'
import { Button, Card, Elevation, Intent } from '@blueprintjs/core'
import uuid from 'uuid/v4'
import items from '../libs/caseItems'
import ItemCard from '../components/ItemCard'

function processItem(item) {
  if (item.skin) return item;
  var data = {
    category: item.category,
    color: item.color,
    id: item.id,
    image: item.image,
    paint_index: item.paint_index,
    rarity: item.rarity,
    suggested_price: item.suggested_price,
    suggested_price_floor: item.suggested_price_floor,
    type: item.type
  }
  var name = item.name
  var regex = /(★ )?(StatTrak™ )?(.+) \| (.+) \((.+)\)/.exec(name)

  // seperate weapons from misc
  if (regex) regex[0] = name.replace(/\((.+)\)/.exec(name)[0], '').replace('StatTrak™ ', '')
  else regex = [name]

  // get item name
  if ((/\((.+)\)/.exec(regex[0])) !== null) data.name = regex[0].replace(/\((.+)\)/.exec(regex[0])[0], '')
  else data.name = regex[0]

  if (regex[4]) data.skin = regex[4]

  data.gun = data.name.substring(0, data.name.lastIndexOf(' |'));

  data.condition = regex[5]

  return data
}

class Spinner extends Component {
  constructor(props) {
    super()

    this.state = {
      items: [],
      spinnerTransition: '',
      spinnerTransform: '',
      spinnerContent: [],
      winnerElevation: Elevation.ONE
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.spin.bind(this)(6, true)
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
    speed = speed || 6
    var itemWidth = 220
    var winningItemIndex = random(150, 200);
    var offset = random(-50, 50) + itemWidth * 2

    console.log('offset', offset)

    this.setState({
      winnerElevation: null,
      spinnerTransition: '',
      spinnerTransform: `translateX(-180px) translateZ(0px)`
    })

    var spinnerItems = items.map(processItem)
    spinnerItems = spinnerItems.filter(item => {
      return item.category.indexOf('Knife') === -1
    })
    var content = this.generateSpinnerContent(spinnerItems, 3)
    var winner = clone(sample(items))
    winner = processItem(winner)
    winner.selected = true;
    content.splice(winningItemIndex, 1, winner)

    this.setState({spinnerContent: content})

    setTimeout(() => {
      this.setState({
        spinnerTransition: `all ${speed}s ease`,
        spinnerTransform: `translateX(${winningItemIndex * -itemWidth + offset}px) translateZ(0px)`
      })
    }, 500)

    setTimeout(() => {
      this.setState({winnerElevation: Elevation.FOUR})
    }, (speed + .5) * 1000)
  }

  render() {
    var { items } = this.props
    return (
      <div className="spinner">
        <div className="inner">
        <div className="tick"></div>
        <div className="overlay-left"></div>
        <div className="overlay-right"></div>
          <div className="spinner-content" style={{
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
                // return (
                //   <Card 
                //     key={uuid() || item.id}
                //     className="spinner-item"
                //     // interactive={true}
                //     elevation={item.selected ? this.state.winnerElevation : null}
                //   >
                //     <div className="item-name">{item.name}</div>
                //     <div className="item-catagory" style={getRarity(item)}>{item.condition}</div>
                //     <img src={item.image['600px']} alt={item.name} />
                //     {/* <div className="item-price">${(opening.item.suggested_price/100).toFixed(2)}</div> */}
                //     {/* <div className="rarity"style={getRarity(opening.item)} /> */}
                //   </Card>
                // )
              })
            }
          </div>
        </div>
        <Button 
          intent={Intent.DANGER}className="spinner-btn" 
          onClick={e => {
            this.spin.bind(this)(6, true)
          }} 
          text="spin"/>
      </div>
    )
  }
}

export default Spinner

