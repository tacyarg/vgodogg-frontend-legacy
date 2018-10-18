import React, { Component } from "react";
import "./Inventory.css";
import ItemCard from "../../components/ItemCard/ItemCard";
import {
  LazyLoadComponent
} from "react-lazy-load-image-component";
import utils from "../../libs/utils";
import { Spinner } from "@blueprintjs/core";
import CountUp from "react-countup";
import { sumBy } from "lodash";

const HeaderContent = ({ items }) => {
  return items.length > 0 ? (
    <h1>
      Current Inventory Value:{" "}
      <CountUp
        prefix="$"
        separator=","
        decimals={2}
        end={sumBy(items, "suggested_price") / 100}
      />
    </h1>
  ) : (
    <h1>You have no items!</h1>
  );
};

class Inventory extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: true,
      items: []
    };

    // setInterval(this.getMyInventory.bind(this), 10000)
  }

  componentDidMount() {
    this.getMyInventory.bind(this)();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  getMyInventory() {
    return this.props
      .callAction("getMyInventory", {
        appid: 1
      })
      .then(response =>
        this.setState({
          loading: false,
          items: response.items
        })
      );
  }

  render() {
    return (
      <div className="Inventory-wrapper">
        {this.state.loading ? (
          <Spinner className="Cases-loading" />
        ) : (
          <HeaderContent items={this.state.items} />
        )}
        <div className="Inventory-items">
          {this.state.items.map(item => {
            item = utils.processItem(item);
            return (
              <LazyLoadComponent key={item.id}>
                <ItemCard key={item.id} {...item} />
              </LazyLoadComponent>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Inventory;
