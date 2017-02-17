// @flow

import React, { PropTypes, Component } from "react";
import * as Document from "../Document/Document";
import DocumentManager from "../DocumentManager/DocumentManager";
import "./ApplicationContent.css";

type Props = {
  autoFocus: "BODY" | "TITLE",
  body: string,
  children?: any,
  isManagerOpen: boolean,
  onBodyChange?: (body: string) => void,
  onDownload?: () => void,
  onManagerClose: () => void,
  onNewDocument?: () => void,
  onOpen?: () => void,
  onTitleChange?: (title: string) => void,
  onToggleRtl?: () => void,
  onTrash?: () => void,
  rtl?: boolean,
  title: string,
};

export default class ApplicationContent extends Component {
  props: Props;
  documentBody: Document.Body;
  documentTitle: Document.Title;
  lastFocused: "TITLE" | "BODY" = "BODY";

  static propTypes = {
    autoFocus: PropTypes.oneOf(["BODY", "TITLE"]),
    body: PropTypes.string.isRequired,
    children: PropTypes.node,
    isManagerOpen: PropTypes.bool.isRequired,
    onBodyChange: PropTypes.func,
    onDownload: PropTypes.func,
    onManagerClose: PropTypes.func.isRequired,
    onNewDocument: PropTypes.func,
    onOpen: PropTypes.func,
    onTitleChange: PropTypes.func,
    onToggleRtl: PropTypes.func,
    onTrash: PropTypes.func,
    rtl: PropTypes.bool,
    title: PropTypes.string.isRequired,
  };

  focusLastFocussedElement = () => {
    if (this.lastFocused === "BODY") {
      this.documentBody.focuserElement.visibleTextArea.focus();
    } else {
      this.documentTitle.element.focus();
    }
  };

  handleToggleRtl = () => {
    const { onToggleRtl } = this.props;

    if (onToggleRtl) {
      onToggleRtl();
    }

    this.focusLastFocussedElement();
  };

  handleBodyFocus = () => {
    this.lastFocused = "BODY";
  };

  handleTitleFocus = () => {
    this.lastFocused = "TITLE";
  };

  getTabIndex(tabIndex: number) {
    return this.props.isManagerOpen ? -1 : tabIndex;
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.isManagerOpen && prevProps.isManagerOpen) {
      this.focusLastFocussedElement();
    }
  }

  render() {
    const {
      autoFocus,
      body,
      children,
      isManagerOpen,
      onBodyChange,
      onDownload,
      onNewDocument,
      onOpen,
      onTitleChange,
      onTrash,
      rtl,
      onManagerClose,
      title,
    } = this.props;

    return (
      <div className="ApplicationContent">
        <article>
          <Document.Controls
            disabled={isManagerOpen}
            onDownload={onDownload}
            onNewDocument={onNewDocument}
            onOpen={onOpen}
            onToggleRtl={this.handleToggleRtl}
            onTrash={onTrash}
            tabIndex={this.getTabIndex(3)}>
            <Document.Title
              ref={ref => this.documentTitle = ref}
              disabled={isManagerOpen}
              title={title}
              autoFocus={autoFocus === "TITLE"}
              onChange={onTitleChange}
              onFocus={this.handleTitleFocus}
              rtl={rtl}
              tabIndex={this.getTabIndex(1)}
            />
          </Document.Controls>
          <Document.Body
            ref={ref => this.documentBody = ref}
            disabled={isManagerOpen}
            body={body}
            autoFocus={autoFocus === "BODY"}
            onChange={onBodyChange}
            onFocus={this.handleBodyFocus}
            tabIndex={this.getTabIndex(2)}
            rtl={rtl}
          />
        </article>

        <DocumentManager isOpen={isManagerOpen} onClose={onManagerClose} />
        {children}
      </div>
    );
  }
}
