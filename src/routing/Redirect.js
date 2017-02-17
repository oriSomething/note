// @flow

import { Component, PropTypes } from "react";
import history from "../utilities/history";

export default class Redirect extends Component {
  props: {|
    push: boolean,
    to: string,
  |};

  static propTypes = {
    push: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    push: false,
  };

  componentDidMount() {
    const { push, to } = this.props;
    const pathname = typeof to === "string" ? to : to.pathname;

    // Don't redirect if it's the same pathname
    if (pathname === history.location.pathname) {
      return;
    }

    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  }

  render() {
    return null;
  }
}
