import React, { Component } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import '../styles/ItemCard.css'

function getRarity(item) {
  return {
    'color': item.color
  }
}

class ItemCard extends Component {
  render() {
    var {name, color, condition, image, suggested_price} = this.props
    return (
      <div className="ItemCard-wrapper">
        <Card 
          interactive={true}
          elevation={Elevation.ONE}
          className="ItemCard-item" 
          {...this.props}
        >
          <div className="ItemCard-top">
            <div className="ItemCard-itemName">{name}</div>
            <div className="ItemCard-itemCondition" style={{color}}>{condition}</div>
          </div>
          <img className="ItemCard-itemImage" src={image ? image['300px'] : ''} alt={name} />
          <div className="ItemCard-itemPrice">${(suggested_price/100).toFixed(2)}</div>
        </Card>
      </div>
    )
  }
}

export default ItemCard

