import React, { Component } from "react";
import styled from "styled-components";
import Title from "./Title";
import AddItem from "./Items/AddItem";
import ItemsList from "./Items/ItemsList";
import Legend from "./Legend";
import Clear from "./Clear";
import "bootstrap/dist/css/bootstrap.css";

const Article = styled.article`
  min-height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-6">
            <Article className="d-flex flex-column py-4 py-md-5">
              <Title/>
              <AddItem/>
              <ItemsList/>
              <Legend/>
              <Clear/>
            </Article>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
