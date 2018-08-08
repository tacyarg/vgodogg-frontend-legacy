import React, { Component } from 'react'
import './Feed.css'
import { Card, Elevation } from '@blueprintjs/core'

function getRarity(item) {
  return {
    'color': item.color
  }
}

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

class Feed extends Component {
  render() {
    const { recentOpenings } = this.props
    return (
      <div className='feed'>
        {recentOpenings.map(opening => {
          opening.item = processItem(opening.item)
          return (
            <Card 
              key={opening.id}
              className="opening"
              interactive={true} 
              elevation={Elevation.ONE}
            >
              <img className="item-image" src={opening.item.image['600px']} alt={opening.item.name} />
              <div className="item-name">{opening.item.name}</div>
              {/* <div className="item-name">{opening.item.skin}</div> */}
              <div className="item-catagory" style={getRarity(opening.item)}>{opening.item.condition}</div>
              <div className="item-price">${(opening.item.suggested_price/100).toFixed(2)}</div>
              {/* <div className="rarity"style={getRarity(opening.item)} /> */}
            </Card>
          )
        })}
        <div className="overlay" />
      </div>
    )
  }
}

export default Feed

