// @flow

import DocumentRecord from "./records/DocumentRecord";
import DocumentsStateRecord from "./records/DocumentsStateRecord";

type State = DocumentsStateRecord;

type ActionUpdateTitle = {
  type: "DOCUMENT_UPDATE_TITLE",
  payload: {
    id: string,
    title: string,
  },
};

type ActionTrashCurrent = {
  type: "DOCUMENT_TRASH",
  payload: {
    id: string,
  },
};

type ActionUpdateBody = {
  type: "DOCUMENT_UPDATE_BODY",
  payload: {
    id: string,
    body: string,
  },
};

type ActionCreate = {
  type: "DOCUMENT_CREATE",
  payload: {
    id: string,
    body: string,
    rtl: boolean,
    title: string,
  },
};

type ActionToggleRtl = {
  type: "DOCUMENT_TOGGLE_RTL",
  payload: {
    id: string,
  },
};

type ActionToggleDefaultRtl = {
  type: "DOCUMENT_TOGGLE_DEFAULT_RTL",
};

export type Action =
  | ActionUpdateTitle
  | ActionTrashCurrent
  | ActionUpdateBody
  | ActionCreate
  | ActionToggleRtl
  | ActionToggleDefaultRtl;

function getInitialState() {
  return new DocumentsStateRecord();
}

export default function documentsReducer(
  state: State = getInitialState(),
  action: Action,
) {
  switch (action.type) {
    case "DOCUMENT_UPDATE_TITLE":
      return documentUpdateTitle(state, action.payload);
    case "DOCUMENT_UPDATE_BODY":
      return documentUpdateBody(state, action.payload);
    case "DOCUMENT_CREATE":
      return documentCreate(state, action.payload);
    case "DOCUMENT_TRASH":
      return documentTrashCurrent(state, action.payload);
    case "DOCUMENT_TOGGLE_RTL":
      return documentToggleRtl(state, action.payload);
    case "DOCUMENT_TOGGLE_DEFAULT_RTL":
      return documentToggleDefaultRtl(state);
    default:
      return state;
  }
}

function documentUpdateTitle(state, payload) {
  return state.setIn(["entities", payload.id, "title"], payload.title);
}

function documentUpdateBody(state, payload) {
  return state.setIn(["entities", payload.id, "body"], payload.body);
}

function documentCreate(state, payload) {
  return state.setIn(
    ["entities", payload.id],
    new DocumentRecord({
      title: payload.title,
      body: payload.body,
      rtl: payload.rtl,
    }),
  );
}

function documentTrashCurrent(state, payload) {
  return state.deleteIn(["entities", payload.id]);
}

function documentToggleRtl(state, payload) {
  const rtl = state.getIn(["entities", payload.id, "rtl"]);

  return state.setIn(["entities", payload.id, "rtl"], !rtl);
}

function documentToggleDefaultRtl(state) {
  return state.set("rtl", !state.rtl);
}
