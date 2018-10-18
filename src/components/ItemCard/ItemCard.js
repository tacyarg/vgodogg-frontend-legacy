import React, { PureComponent } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import './ItemCard.css'

function CardBackground(image) {
  return {
    borderRadius: '50%',
    transform: 'rotate(-30deg)',
    right: '-80px',
    bottom: '-80px',
    opacity: '0.25',
    minHeight: '200px',
    width: '200px',
    position: 'absolute',
    background: `url('${image}')`,
    border: '1px solid black',
    // boxShadow: 'inset 0px 0px 10px rgba(0,0,0,1)'
  }
}

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    }
  }

  toggleHover = e => {
    this.setState({hovered: !this.state.hovered})
  }

  render() {
    var {
      name,
      color,
      category,
      condition,
      image,
      suggested_price,
      user,
      box,
    } = this.props
    return (
      <div className="ItemCard-wrapper">
        <Card
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          interactive={true}
          elevation={Elevation.ONE}
          className="ItemCard-item"
          {...this.props}
        >
          {user ? (
            <div
              className="ItemCard-bg"
              style={CardBackground(user.avatarurl)}
            />
          ) : null}
          <div className="ItemCard-top">
            <div className="ItemCard-itemName">{name}</div>
            <div className="ItemCard-itemCondition" style={{ color }}>
              {condition || category}
            </div>
          </div>
          {
            box
            ? <img
            className="ItemCard-itemImage"
            src={this.state.hovered ? box.image['300px'] : image['300px']}
            alt={name}
          /> : <img
          className="ItemCard-itemImage"
          src={image ? image['300px'] : null}
          alt={name}
        />
          }
          <div className="ItemCard-itemPrice">
            ${(suggested_price / 100).toFixed(2)}
          </div>
        </Card>
      </div>
    )
  }
}

export default ItemCard
