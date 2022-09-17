import React, { Component } from "react";

const Context = React.createContext();

// Login
// Get user login credentials from database
// Store user as authorized throughout the app

// Create account
// Receive user login credentials from form
//  if username does not exist, persist in db
//  else if username exists, throw warning
// Redirect to login page

export class Provider extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    const value = {};

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
