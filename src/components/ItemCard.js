import React, { Component } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import '../styles/ItemCard.css'

function getRarity(item) {
  return {
    'color': item.color
  }
}

// https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e0/e0de1ad6f49a0b45c066a1e7ba38b3412ab002de_full.jpg

function CardBackground(user) {
  return {
    borderRadius: '50%',
    transform: 'rotate(-40deg)',
    right: '-70px',
    bottom: '-60px',
    opacity: '0.25',
    minHeight: '175px',
    width: '210px',
    position: 'absolute',
    background: `url('${user.avatarurl}')`
  }
}

class ItemCard extends Component {
  render() {
    var {name, color, condition, image, suggested_price, user} = this.props
    console.log(user)
    return (
      <div className="ItemCard-wrapper">
        <Card 
          interactive={true}
          elevation={Elevation.ONE}
          className="ItemCard-item" 
          {...this.props}
        >
          {user ? <div className="ItemCard-bg" style={CardBackground(user)}/> : null}
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

