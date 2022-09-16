import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
  }

  render() {
    const value = {};

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
