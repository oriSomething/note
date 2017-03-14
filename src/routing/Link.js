// @flow

import React, { Component, PropTypes } from "react";
import history, { type HistoryHashLocation } from "../utilities/history";

type Props = {|
  className?: string,
  children?: React$Element<any>,
  onClick?: (ev: SyntheticMouseEvent) => void,
  replace?: boolean,
  target?: string,
  to: string | HistoryHashLocation,
|};

type State = {
  currentPathname: string,
};

export default class Link extends Component {
  state: State;
  props: Props;

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    target: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };

  static defaultProps = {
    className: "",
    replace: false,
  };

  state = {
    currentPathname: "",
  };

  static isModifiedEvent(event: SyntheticMouseEvent) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }

  handleClick = (event: SyntheticMouseEvent) => {
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !this.constructor.isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { replace, to } = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  isActiveRoute() {
    const { to } = this.props;
    const pathname = typeof to === "string" ? to : to.pathname;

    return this.state.currentPathname === pathname;
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { replace, to, ...props } = this.props;
    /* eslint-enable no-unused-vars */

    const params = typeof to === "string" ? { pathname: to } : to;
    const href = history.createHref(params);

    return <a {...props} onClick={this.handleClick} href={href} />;
  }
}
