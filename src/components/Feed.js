import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Feed.css'

class Feed extends Component {
  render() {
    const { recentOpenings } = this.props
    return (
      <div className='wrapper'>
        {recentOpenings.map(opening => {
          return (
            <div 
              className='opening' 
              key={opening.id}
            >
              <div className='itemName'>
                {opening.item.name}
              </div>

              <div className='itemImage'>
                <img alt={opening.item.name} src={opening.item.image['300px']}></img>
              </div>

              <div className='footer'>
                <div className='price'>${opening.item.suggested_price.toFixed(2)}</div>
                <div className='caseid'>#{opening.id}</div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Feed;

