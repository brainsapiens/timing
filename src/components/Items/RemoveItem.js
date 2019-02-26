import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const RemoveButton = styled.span`
  cursor: pointer;
`;

class RemoveItem extends PureComponent {
  render() {
    return (
      <RemoveButton
        title="Удалить"
        className="remove-btn p-2 text-danger"
        ref={(removeButton) => { this.removeButton = removeButton }}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.remove}>
        <i className="mdi mdi-18px mdi-delete" ref={(removeIcon) => { this.removeIcon = removeIcon }}/>
      </RemoveButton>
    );
  }

  mouseEnter = () => {
    this.removeIcon.classList.add('mdi-delete-empty');
  };

  mouseLeave = () => {
    this.removeIcon.classList.remove('mdi-delete-empty');
  };

  remove = () => {
    const index = this.props.index;

    if (index !== undefined) {
      this.props.onRemoveItem(index);
    }

    return false;
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onRemoveItem: (index) => {
      dispatch({type: "REMOVE_ITEM", payload: index});
    }
  })
)(RemoveItem);
