import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Total extends PureComponent {
  constructor(props) {
    super(props);

    let total = 0;

    if (this.props.store.items.length !== 0) {
      this.props.store.items.map(item =>
        total += parseInt(item.time, 10)
      )
    }

    this.state = {
      total: total
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.items !== this.props.store.items) {
      let total = 0;

      if (nextProps.store.items !== undefined) {
        nextProps.store.items.map(item =>
          total += parseInt(item.time, 10)
        )
      }

      this.setState({
        total: total
      })
    }
  }

  render() {
    const total = <li className="d-flex justify-content-between align-items-baseline pl-4 pr-3 py-1 list-unstyled text-muted">
      Всего часов: <span className="lead text-primary">{this.state.total}</span>
    </li>;

    return (
      this.state.total !== 0 && total
    );
  }
}

export default connect(
  state => ({
    store: state
  })
)(Total);
