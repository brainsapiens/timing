import React, { Component } from "react";
import { connect } from "react-redux";

class AddItem extends Component {
  render() {
    const optionsTypes = this.props.store.types.map((type, index) =>
      <option key={index} value={type.value}>{type.title}</option>
    );

    return (
      <form className="input-group mb-4 mb-md-5 d-print-none">
        <select name="type" defaultValue="type" autoFocus className="col-md-3 custom-select rounded-0" style={{width: '40%'}} ref={(type) => { this.type = type }} onChange={this.change}>
          <option value="type" disabled>Тип</option>
          {optionsTypes}
        </select>
        <input type="text" name="title" placeholder="Название" className="col-md-4 form-control" style={{width: '41%'}} ref={(title) => { this.title = title }} onKeyUp={this.add}/>
        <input type="number" min="1" name="time" placeholder="ч" className="col-md-2 form-control" style={{width: '18%'}} ref={(time) => { this.time = time }} onKeyUp={this.add}/>
        <button type="button" className="col-12 col-md-3 btn btn-primary rounded-0" onClick={this.add}>Добавить</button>
      </form>
    );
  }

  change = () => {
    if (this.type.options.selectedIndex !== 0) {
      this.title.focus();
    }
  };

  add = (e) => {
    if (e.key === undefined || e.key === "Enter") {
      const type = this.type;
      const title = this.title;
      const time = this.time;

      // Validating form elements input
      if (type.options.selectedIndex === 0) {
        type.classList.add("is-invalid");
      } else {
        type.classList.remove("is-invalid");
      }

      if (title.value === "") {
        title.classList.add("is-invalid");
      } else {
        title.classList.remove("is-invalid");
      }

      if (time.value === "" || time.value < time.getAttribute("min")) {
        time.classList.add("is-invalid");
      } else {
        time.classList.remove("is-invalid");
      }

      // Returning if invalid
      if (type.options.selectedIndex === 0 || title.value === "" || time.value === "" || time.value < time.getAttribute("min")) {
        return;
      }

      // Collecting data from form elements
      let item = {
        type: type.options.item(type.options.selectedIndex).innerText,
        title: title.value,
        time: time.value
      };

      // Adding item to store
      this.props.onAddItem(item);

      // Clearing form elements values
      type.options.selectedIndex = 0;
      type.focus();
      title.value = "";
      time.value = "";
    }

    return false;
  };
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onAddItem: (item) => {
      dispatch({type: "ADD_ITEM", payload: item});
    }
  })
)(AddItem);
