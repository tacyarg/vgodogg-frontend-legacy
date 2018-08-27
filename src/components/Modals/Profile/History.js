import React, { Component } from "react";
import moment from "moment";
import { Classes, Elevation } from "@blueprintjs/core";
import classNames from "classnames";
import { sumBy } from 'lodash'
import CountUp from "react-countup";
import LazyComponent from "react-component-lazy";

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offers: []
    };
  }

  componentDidMount() {
    this.props.callAction('getMyOfferHistory')
      .then(offers => this.setState({ offers }))
  }

  render() {
    return (
      <div className="Profile-content-body-panel-wrapper">
        <div className="Profile-content-body-panel">
          <div className="history">
            {
              this.state.offers.map(offer => {
                return <div className={classNames(Classes.CARD, 'history-entry')}>
                  <div className="history-entry-header">
                    <a className="history-entry-offerid" href={offer.url}>
                      OfferID: {offer.id}
                    </a>
                    <span className="history-entry-time">{moment(offer.created).calendar()}</span>
                  </div>
                  <div className="history-entry-body">
                    <div className="history-entry-items-container">
                      {
                        offer.recipient.items.map(item => {
                          return <LazyComponent>
                            <div className="history-entry-item">
                              <img target="_Blank" src={item.image['300px']} alt={item.name} />
                            </div>
                          </LazyComponent>
                        })
                      }
                      <span className="history-entry-items-value">
                        {/* <b>Value: </b> */}
                        <CountUp
                          prefix="$"
                          separator=","
                          decimals={2}
                          end={sumBy(offer.recipient.items, 'suggested_price') / 100} 
                        />
                      </span>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default History;
