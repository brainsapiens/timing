import React, { Component } from "react";
import RemoveItem from "./RemoveItem";
import "mdi/css/materialdesignicons.css";

class Item extends Component {
  render() {
    return (
      <div className="row align-items-baseline">
        <div className="col">
          <span className="badge badge-secondary mr-1 align-text-top rounded-0">{(this.props.item.type).substr(0, 1)}</span>
          <span className="text-dark">{this.props.item.title}</span>
        </div>
        <div className="col-3 col-md-2">
          <div className="text-right text-dark">{this.props.item.time}</div>
        </div>
        <RemoveItem index={this.props.itemIndex}/>
      </div>
    )
  }
}

export default Item;
