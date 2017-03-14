// @flow

import cx from "classnames";
import React, { PureComponent, PropTypes } from "react";
import documentsConnector, {
  type Props as DocumentsProps,
} from "../store/documentsConnector";
import createId from "../utilities/createId";
import history from "../utilities/history";
import "./UploadFile.css";

type Props = DocumentsProps;

type State = {
  isVisible: boolean,
};

class UploadFile extends PureComponent {
  props: Props;
  state: State;
  element: HTMLDivElement;

  static propTypes = {
    createDocument: PropTypes.func.isRequired,
  };

  state = {
    isVisible: false,
  };

  openFile(file: File) {
    if (file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = () => {
        const id = createId();
        const fileContent = reader.result;
        let fileName = file.name;

        // Remove .txt extension
        if (/\.txt$/.test(fileName)) {
          fileName = fileName.substr(0, fileName.length - 4);
        }

        this.props.createDocument(id, fileName, fileContent);
        history.replace("/documents/" + id);
      };

      reader.readAsText(file);
    }
  }

  handleDrop = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer == null || event.dataTransfer.files == null) {
      return;
    }

    const files = event.dataTransfer.files;

    if (files.length === 1) {
      this.openFile(files[0]);
    }

    this.setState({ isVisible: false });
  };

  handleDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }

    this.setState({ isVisible: true });
  };

  handleDragOut = (event: DragEvent) => {
    event.preventDefault();

    this.setState({ isVisible: false });
  };

  componentDidMount() {
    document.addEventListener("dragover", this.handleDragOver);
    this.element.addEventListener("drop", this.handleDrop);
    this.element.addEventListener("dragleave", this.handleDragOut);
  }

  componentWillUnmount() {
    document.removeEventListener("dragover", this.handleDragOver);
    this.element.removeEventListener("drop", this.handleDrop);
    this.element.removeEventListener("dragleave", this.handleDragOut);
  }

  render() {
    return (
      <div
        ref={el => this.element = el}
        aria-dropeffect="execute"
        className={cx("UploadFile", {
          "UploadFile--hidden": !this.state.isVisible,
        })}>
        <h1 className="UploadFile__title">Upload file</h1>
        <div className="UploadFile__overlay" />
      </div>
    );
  }
}

export default documentsConnector(UploadFile);
