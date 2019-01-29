import React, { Component } from "react";
import { connect } from "react-redux";
import CONFIG from '../config';

class Clear extends Component {
  state = {
    isVisible: false
  };

  componentWillMount() {
    if (this.props.store.title !== CONFIG.TITLE || this.props.store.items.length !== 0) {
      this.setState({
        isVisible: true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.title !== CONFIG.TITLE || nextProps.store.items.length !== 0) {
      this.setState({
        isVisible: true
      })
    } else {
      this.setState({
        isVisible: false
      })
    }
  }

  render() {
    const clear = <div className="d-flex justify-content-end mt-auto d-print-none">
      <button type="button" className="btn btn-sm btn-danger rounded-0" onClick={this.clear}>Очистить</button>
    </div>;

    return (
      this.state.isVisible && clear
    )
  }

  clear = () => {
    if (window.confirm("Внимание! Все данные будут утеряны.")) {
      this.props.onClear();
    }
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onClear: () => {
      dispatch({type: "CLEAR"});
    }
  })
)(Clear);





