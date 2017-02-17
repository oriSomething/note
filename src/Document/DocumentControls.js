// @flow

import React, { PropTypes } from "react";
import * as Icons from "../Icons/Icons";
import noop from "../utilities/noop";
import "./DocumentControls.css";

type Props = {
  children?: React$Element<any>,
  disabled?: boolean,
  onDownload?: () => void,
  onNewDocument?: () => void,
  onOpen?: () => void,
  onToggleRtl?: () => void,
  onTrash?: () => void,
  tabIndex?: number | string,
};

export default function DocumentControls(props: Props) {
  const {
    children,
    disabled = false,
    onDownload = noop,
    onNewDocument = noop,
    onOpen = noop,
    onToggleRtl = noop,
    onTrash = noop,
    tabIndex,
  } = props;

  return (
    <header className="DocumentControls">
      {children}
      <ul className="DocumentControls__controls">
        <li className="DocumentControls__control">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onNewDocument()}
            tabIndex={tabIndex}
            className="DocumentControls__button">
            <Icons.New />
          </button>
        </li>
        <li className="DocumentControls__control">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onOpen()}
            tabIndex={tabIndex}
            className="DocumentControls__button">
            <Icons.Open />
          </button>
        </li>
        <li className="DocumentControls__control">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onToggleRtl()}
            tabIndex={tabIndex}
            className="DocumentControls__button">
            <Icons.Paragraph />
          </button>
        </li>
        <li className="DocumentControls__control">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTrash()}
            tabIndex={tabIndex}
            className="DocumentControls__button">
            <Icons.Clear />
          </button>
        </li>
        <li className="DocumentControls__control">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onDownload()}
            tabIndex={tabIndex}
            className="DocumentControls__button">
            <Icons.Download />
          </button>
        </li>
      </ul>
    </header>
  );
}

DocumentControls.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onDownload: PropTypes.func,
  onNewDocument: PropTypes.func,
  onOpen: PropTypes.func,
  onToggleRtl: PropTypes.func,
  onTrash: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
