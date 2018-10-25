import React, { Component } from 'react'
import './OpeningFeed.css'
import ItemCard from '../ItemCard/ItemCard'
import utils from '../../libs/utils'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class OpeningFeed extends Component {
  render() {
    const { recentOpenings, boxes } = this.props
    return (
      <ReactCSSTransitionGroup
        className="OpeningFeed-wrapper"
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        style={{ color: 'white', background: '#10161A' }}
      >
        {recentOpenings.map(opening => {
          var item = utils.processItem(opening.item)
          return (
            <ItemCard
              {...item}
              box={boxes.find(box => box.id === opening.case_id)}
              key={opening.id}
              elevation={item.selected ? this.state.winnerElevation : null}
              user={opening.user}
            />
          )
        })}
        {/* <div className="OpeningFeed-overlay-left" /> */}
        <div className="OpeningFeed-overlay-right" />
      </ReactCSSTransitionGroup>
    )
  }
}

export default OpeningFeed
