// @flow

import React, { Component, PropTypes } from "react";
import DynamicTextarea from "../DynamicTextarea/DynamicTextarea";
import Clickable from "../Clickable/Clickable";
import "./DocumentBody.css";

type Props = {
  autoFocus?: boolean,
  body: string,
  disabled?: boolean,
  onChange?: (body: string) => void,
  onFocus?: () => void,
  rtl?: boolean,
  tabIndex?: number | string,
};

export default class DocumentBody extends Component {
  props: Props;
  focuserElement: DynamicTextarea;

  static propTypes = {
    autoFocus: PropTypes.bool,
    body: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    rtl: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  handleFocuserClick = () => {
    if (this.focuserElement) {
      this.focuserElement.visibleTextArea.focus();
    }
  };

  handleDynamicTextareaFocus = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus();
    }
  };

  render() {
    const {
      autoFocus = false,
      body,
      disabled = false,
      onChange,
      rtl,
      tabIndex,
    } = this.props;

    return (
      <div className="DocumentBody">
        <Clickable onClick={this.handleFocuserClick} />
        <DynamicTextarea
          ref={el => this.focuserElement = el}
          disabled={disabled}
          autoFocus={autoFocus}
          onFocus={this.handleDynamicTextareaFocus}
          value={body}
          onChange={onChange}
          tabIndex={tabIndex}
          rtl={rtl}
        />
      </div>
    );
  }
}
