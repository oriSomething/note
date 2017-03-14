// @flow

import { connect } from "react-redux";
import { type Action } from "./documentsReducer";
import DocumentsStateRecord from "./records/DocumentsStateRecord";

type DispatchToProps = {
  createDocument: (
    id: string,
    title: string,
    body: string,
    rtl?: boolean,
  ) => void,
  trashDocument: (id: string) => void,
  updateDocumentBody: (id: string, body: string) => void,
  updateDocumentTitle: (id: string, title: string) => void,
  toggleDocumentRtl: (id: string) => void,
  toggleDefaultDocumentRtl: () => void,
};

type StateToProps = {
  documents: DocumentsStateRecord,
};

export type Props = StateToProps & DispatchToProps;

type Dispatcher = (value: Action) => void;

export default connect(mapStateToProps, mapDispatchToProps);

function mapStateToProps(state): StateToProps {
  return state;
}

function mapDispatchToProps(dispatch: Dispatcher): DispatchToProps {
  return {
    createDocument(id, title = "", body = "", rtl = false) {
      dispatch({
        type: "DOCUMENT_CREATE",
        payload: {
          id,
          title,
          body,
          rtl,
        },
      });
    },

    trashDocument(id) {
      dispatch({
        type: "DOCUMENT_TRASH",
        payload: {
          id,
        },
      });
    },

    updateDocumentTitle(id, title) {
      dispatch({
        type: "DOCUMENT_UPDATE_TITLE",
        payload: {
          id,
          title,
        },
      });
    },

    updateDocumentBody(id, body) {
      dispatch({
        type: "DOCUMENT_UPDATE_BODY",
        payload: {
          id,
          body,
        },
      });
    },

    toggleDocumentRtl(id) {
      dispatch({
        type: "DOCUMENT_TOGGLE_RTL",
        payload: {
          id,
        },
      });
    },

    toggleDefaultDocumentRtl() {
      dispatch({
        type: "DOCUMENT_TOGGLE_DEFAULT_RTL",
      });
    },
  };
}
