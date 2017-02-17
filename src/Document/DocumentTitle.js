// @flow

import cx from "classnames";
import React, { PropTypes, Component } from "react";
import "./DocumentTitle.css";

type Props = {
  autoFocus?: boolean,
  disabled?: boolean,
  onChange?: (title: string) => void,
  onFocus?: () => void,
  placeholder?: string,
  rtl?: boolean,
  tabIndex?: number | string,
  title: string,
};

export default class DocumentTitle extends Component {
  props: Props;
  element: HTMLInputElement;

  static propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    rtl: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string.isRequired,
  };

  handleChange = (event: SyntheticInputEvent) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  };

  handleFocus = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus();
    }
  };

  getPlaceholder() {
    if (typeof this.props.placeholder === "string") {
      return this.props.placeholder;
    }

    if (this.props.rtl) {
      return "ללא כותרת";
    } else {
      return "Untitled";
    }
  }
  render() {
    const {
      autoFocus = false,
      disabled = false,
      rtl = false,
      tabIndex,
      title,
    } = this.props;

    return (
      <input
        type="text"
        ref={ref => this.element = ref}
        disabled={disabled}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        autoFocus={autoFocus}
        value={title}
        placeholder={this.getPlaceholder()}
        tabIndex={tabIndex}
        className={cx("DocumentTitle", {
          "DocumentTitle--rtl": rtl,
        })}
      />
    );
  }
}
