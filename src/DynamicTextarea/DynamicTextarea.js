// @flow

import cx from "classnames";
import React, { Component, PropTypes } from "react";
import noop from "../utilities/noop";
import "./DynamicTextarea.css";

type Props = {
  autoFocus?: boolean,
  className?: string,
  disabled?: boolean,
  onChange?: (value: string) => void,
  onFocus: () => void,
  rtl?: boolean,
  style?: Object,
  tabIndex?: number | string,
  value: string,
};

export default class DynamicTextarea extends Component {
  props: Props;
  element: HTMLDivElement;
  hiddenTextArea: HTMLTextAreaElement;
  visibleTextArea: HTMLTextAreaElement;

  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    rtl: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  handleChange = (event: SyntheticInputEvent) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  };

  handleFocus = () => {
    const { onFocus } = this.props;

    if (this.element) {
      this.element.classList.add("DynamicTextarea--focus");
    }

    if (onFocus) {
      onFocus();
    }
  };

  handleBlur = () => {
    this.element.classList.remove("DynamicTextarea--focus");
  };

  recalc() {
    this.hiddenTextArea.style.setProperty("height", "");
    const { scrollHeight } = this.hiddenTextArea;
    this.hiddenTextArea.style.setProperty("height", `${scrollHeight}px`);
    this.visibleTextArea.style.setProperty("height", `${scrollHeight}px`);
    this.element.style.setProperty("height", `${scrollHeight}px`);
  }

  componentDidMount() {
    this.recalc();
  }

  componentDidUpdate() {
    this.recalc();
  }

  render() {
    const {
      autoFocus,
      className,
      disabled = false,
      rtl,
      style,
      tabIndex,
    } = this.props;

    return (
      <div
        ref={el => this.element = el}
        className={cx("DynamicTextarea", className)}
        style={style}>
        <textarea
          autoFocus={autoFocus}
          disabled={disabled}
          ref={el => this.visibleTextArea = el}
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          tabIndex={tabIndex}
          className={cx("DynamicTextarea__textarea", {
            "DynamicTextarea__textarea--rtl": rtl,
          })}
        />

        <textarea
          ref={el => this.hiddenTextArea = el}
          disabled={disabled}
          value={this.props.value}
          onChange={noop}
          tabIndex="-1"
          className={cx("DynamicTextarea__textarea", {
            "DynamicTextarea__textarea--rtl": rtl,
          })}
        />
      </div>
    );
  }
}
