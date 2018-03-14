import React, { PureComponent } from "react";
import { object } from "prop-types";

export default class AsyncComponent extends PureComponent {
  static propTypes = {
    importer: object.isRequired
  };

  state = { ready: false, Component: null };

  componentWillMount() {
    const { importer } = this.props;
    importer().then(mod => this.setState({ Component: mod.default }));
  }

  render() {
    const { Component } = this.state;
    return Component ? <Component /> : null;
  }
}
