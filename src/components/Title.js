import React, { Component } from "react";
import { connect } from "react-redux";

class Title extends Component {
  render() {
    document.title = this.props.store.title;

    return (
      <h1 className="mb-4 mb-md-5" style={{cursor: "pointer"}} ref={(title) => { this.title = title }} onClick={this.change}>{this.props.store.title}</h1>
    );
  }

  change = () => {
    const title = this.title;
    const input = document.createElement("input");

    title.replaceWith(input);

    input.setAttribute("type", "text");
    input.setAttribute("value", title.innerText);
    input.classList.add("d-block", "w-100", "mb-4", "mb-md-5", "p-0", "h1", "border-0");
    input.focus();
    input.select();

    input.addEventListener("keyup", (event) => {
      const key = event.keyCode;

      if (key === 13 || key === 27) {
        input.blur();
      }
    });

    input.addEventListener("blur", () => {
      const value = input.value;

      input.replaceWith(title);

      if (value === "") {
        return;
      }

      this.props.onChangeTitle(value);

      document.title = value;
    });
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onChangeTitle: (value) => {
      dispatch({type: "CHANGE_TITLE", payload: value});
    }
  })
)(Title);
