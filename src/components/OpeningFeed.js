import React, { Component } from "react";
import "../styles/OpeningFeed.css";
import ItemCard from "../components/ItemCard";
import utils from "../libs/utils";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  LazyLoadComponent,
  LazyLoadImage,
  trackWindowScroll
} from "react-lazy-load-image-component";

class OpeningFeed extends Component {
  render() {
    const { recentOpenings } = this.props;
    return (
      <ReactCSSTransitionGroup
        className="OpeningFeed-wrapper"
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {recentOpenings.map(opening => {
          var item = utils.processItem(opening.item);
          return (
            <LazyLoadComponent key={opening.id}>
              <ItemCard
                // key={opening.id}
                elevation={item.selected ? this.state.winnerElevation : null}
                {...item}
                user={opening.user}
              />
            </LazyLoadComponent>
          );
        })}
        {/* <div className="OpeningFeed-overlay-left" /> */}
        <div className="OpeningFeed-overlay-right" />
      </ReactCSSTransitionGroup>
    );
  }
}

export default OpeningFeed;
