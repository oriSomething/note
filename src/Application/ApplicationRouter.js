// @flow

import React, { Component, PropTypes } from "react";
import { Redirect } from "react-router-dom";
import IndexRoute from "./routes/IndexRoute";
import DocumentsDocumentRoute from "./routes/DocumentsDocumentRoute";
import documentsConnector, {
  type Props as DocumentsProps,
} from "../store/documentsConnector";
import navigationConnector, {
  type Props as NavigationProps,
} from "../store/navigationConnector";

import {
  type RouterType,
  getAutoFocusFromLocation,
  getCurrentRoute,
} from "../utilities/router/router";
import "./Application.css";

const NEW_DOCUMENT_ID = -1;

class ApplicationRouter extends Component {
  props: DocumentsProps & NavigationProps & {
    router: RouterType,
  };

  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
    }).isRequired,
    documents: PropTypes.shape({
      current: PropTypes.number.isRequired,
    }).isRequired,
    setCurrent: PropTypes.func.isRequired,
  };

  closeManager() {
    const { documents, router } = this.props;

    if (documents.current === NEW_DOCUMENT_ID) {
      router.push("/");
    } else {
      router.push(`/documents/${documents.current}`);
    }
  }

  handleDocumentsManagerClose = () => {
    this.closeManager();
  };

  handleOpenManager = () => {
    const { router, documents } = this.props;
    const currentRoute = getCurrentRoute(router, documents);

    if (currentRoute.isManagerOpen) {
      this.closeManager();
    } else {
      router.push("/documents");
    }
  };

  render() {
    const { documents, router } = this.props;
    const currentRoute = getCurrentRoute(router, documents);

    switch (currentRoute.route) {
      case "INDEX":
        return (
          <IndexRoute
            onOpen={this.handleOpenManager}
            isManagerOpen={currentRoute.isManagerOpen}
            onManagerClose={this.handleDocumentsManagerClose}
          />
        );

      case "DOCUMENTS":
        return (
          <DocumentsDocumentRoute
            autoFocus={getAutoFocusFromLocation(router.location)}
            id={currentRoute.id}
            onOpen={this.handleOpenManager}
            isManagerOpen={currentRoute.isManagerOpen}
            onManagerClose={this.handleDocumentsManagerClose}
          />
        );

      default:
        return <Redirect to="/" />;
    }
  }
}

export default documentsConnector(navigationConnector(ApplicationRouter));
