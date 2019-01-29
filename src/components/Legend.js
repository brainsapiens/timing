import React, { Component } from "react";
import { connect } from "react-redux";

class Legend extends Component {
  render() {
    const legendTypes = this.props.store.types.map((type, index) =>
      <li key={index} className="mb-2 list-unstyled"><span className="badge badge-secondary mr-1 rounded-0">{(type.title).substr(0, 1)}</span><small className="text-muted">{type.title}</small></li>
    );

    return (
      <ul className="d-none d-print-block mt-auto">
        {legendTypes}
      </ul>
    )
  }
}

export default connect(
  state => ({
    store: state
  })
)(Legend);








