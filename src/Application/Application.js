// @flow

import React, { PropTypes, Component } from "react";
import documentsConnector, {
  type Props as DocumentsProps,
} from "../store/documentsConnector";
import navigationConnector, {
  type Props as NavigationProps,
} from "../store/navigationConnector";
import ApplicationContent from "./ApplicationContent";
import Title from "../Title/Title";
import UploadFile from "../UploadFile/UploadFile";
import history from "../utilities/history";
import Redirect from "../routing/Redirect";
import createId from "../utilities/createId";
import download from "../utilities/download";
import { EMPTY_DOCUMENT_ID } from "../store/records/NavigationStateRecord";
import "./Application.css";

type Props = DocumentsProps & NavigationProps;

class Application extends Component {
  props: Props;

  static propTypes = {
    createDocument: PropTypes.func.isRequired,
    documents: PropTypes.shape({
      entities: PropTypes.object.isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      activeDocument: PropTypes.string.isRequired,
      autoFocus: PropTypes.oneOf(["BODY", "TITLE"]),
      isManagerOpen: PropTypes.bool.isRequired,
      otherwise: PropTypes.bool.isRequired,
    }).isRequired,
    trashDocument: PropTypes.func.isRequired,
    updateDocumentBody: PropTypes.func.isRequired,
    updateDocumentTitle: PropTypes.func.isRequired,
    toggleDocumentRtl: PropTypes.func.isRequired,
    toggleDefaultDocumentRtl: PropTypes.func.isRequired,
  };

  /**
   * We need this property, since changing route is an async operation, that
   * sometimes happens faster than updates on the <input> comparing to React
   * aware to state change
   * @type {Boolean}
   */
  isLockedByDocumentCreation = false;

  getId(): string {
    const { activeDocument } = this.props.navigation;

    return typeof activeDocument !== "string"
      ? EMPTY_DOCUMENT_ID
      : activeDocument;
  }

  isNewDocument() {
    return this.getId() === EMPTY_DOCUMENT_ID;
  }

  getRtl(): boolean {
    const { documents } = this.props;
    if (this.isNewDocument()) {
      return documents.rtl;
    } else {
      return documents.getIn(["entities", this.getId(), "rtl"]);
    }
  }

  createAndRedirectDocument(body: string, title: string) {
    if (this.isLockedByDocumentCreation) return;

    const id = createId();
    const { rtl } = this.props.documents;
    this.props.createDocument(id, body, title, rtl);
    history.replace("/documents/" + id);
  }

  hasActiveDocument() {
    const { documents } = this.props;
    const id: ?string = this.getId();
    const activeDocument = documents.getIn(["entities", id]);
    return Boolean(activeDocument);
  }

  handleNewDocument = () => {
    if (!this.isNewDocument()) {
      history.push("/");
    }
  };

  handleToggleManager = () => {
    const { navigation } = this.props;

    if (navigation.isManagerOpen) {
      if (this.isNewDocument()) {
        history.push("/");
      } else {
        history.push("/documents/" + this.getId());
      }
    } else {
      history.push("/documents");
    }
  };

  handleToggleRtl = () => {
    if (this.isNewDocument()) {
      this.props.toggleDefaultDocumentRtl();
    } else {
      this.props.toggleDocumentRtl(this.getId());
    }
  };

  handleTrash = () => {
    if (!this.isNewDocument()) {
      this.props.trashDocument(this.getId());
    }
  };

  handleDownload = () => {
    const { documents } = this.props;

    if (!this.isNewDocument()) {
      const title = documents.getIn(["entities", this.getId(), "title"], "");
      const body = documents.getIn(["entities", this.getId(), "body"], "");
      download(title, body);
    }
  };

  handleTitleChange = title => {
    if (this.isNewDocument()) {
      this.createAndRedirectDocument(title, "");
    } else {
      this.props.updateDocumentTitle(this.getId(), title);
    }
  };

  handleBodyChange = body => {
    if (this.isNewDocument()) {
      this.createAndRedirectDocument("", body);
    } else {
      this.props.updateDocumentBody(this.getId(), body);
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    const { navigation } = nextProps;

    if (this.isLockedByDocumentCreation) {
      this.isLockedByDocumentCreation = navigation.activeDocument ===
        EMPTY_DOCUMENT_ID;
    }
  }

  render() {
    const { documents, navigation } = this.props;
    const { autoFocus } = navigation;
    const id: ?string = navigation.get("activeDocument");
    const title = documents.getIn(["entities", id, "title"], "");
    const body = documents.getIn(["entities", id, "body"], "");
    const { isManagerOpen } = navigation;

    return (
      <div className="Application">
        <Title title={title} />
        <ApplicationContent
          autoFocus={autoFocus}
          body={body}
          title={title}
          rtl={this.getRtl()}
          onNewDocument={this.handleNewDocument}
          onOpen={this.handleToggleManager}
          onTrash={this.handleTrash}
          onDownload={this.handleDownload}
          onTitleChange={this.handleTitleChange}
          onBodyChange={this.handleBodyChange}
          onToggleRtl={this.handleToggleRtl}
          isManagerOpen={isManagerOpen}
          onManagerClose={this.handleToggleManager}
        />
        <UploadFile />
        {this.hasActiveDocument() ? null : <Redirect to="/" />}
        {navigation.otherwise ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default documentsConnector(navigationConnector(Application));
