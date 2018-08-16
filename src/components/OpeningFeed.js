import React, { Component } from 'react'
import '../styles/OpeningFeed.css'
import ItemCard from '../components/ItemCard'
import utils from '../libs/utils'


class OpeningFeed extends Component {
  render() {
    const { recentOpenings } = this.props
    return (
      <div className='OpeningFeed-wrapper'>
        {recentOpenings.map(opening => {
          console.log(opening)
          var item = utils.processItem(opening.item)
          return (
            <ItemCard 
              elevation={item.selected ? this.state.winnerElevation : null}
              {...item} user={opening.user}
            />
          )
        })}
        {/* <div className="OpeningFeed-overlay-left" /> */}
        <div className="OpeningFeed-overlay-right" />
      </div>
    )
  }
}

export default OpeningFeed

