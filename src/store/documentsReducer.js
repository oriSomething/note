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
  let state = new DocumentsStateRecord();

  for (let item of loadLocalStorageItems()) {
    state = state.setIn(["entities", item.id], createDocumentRecord(item));
  }

  return state;
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
  state = state.setIn(["entities", payload.id, "title"], payload.title);
  saveItemToLocalStorage(state, payload.id);
  return state;
}

function documentUpdateBody(state, payload) {
  state = state.setIn(["entities", payload.id, "body"], payload.body);
  saveItemToLocalStorage(state, payload.id);
  return state;
}

function documentCreate(state, payload) {
  state = state.setIn(["entities", payload.id], createDocumentRecord(payload));
  saveItemToLocalStorage(state, payload.id);
  return state;
}

function documentTrashCurrent(state, payload) {
  removeItemFromLocalStorage(payload.id);
  return state.deleteIn(["entities", payload.id]);
}

function documentToggleRtl(state, payload) {
  const rtl = state.getIn(["entities", payload.id, "rtl"]);

  state = state.setIn(["entities", payload.id, "rtl"], !rtl);
  saveItemToLocalStorage(state, payload.id);
  return state;
}

function documentToggleDefaultRtl(state) {
  return state.set("rtl", !state.rtl);
}

/**
 * Helpers
 */

function createDocumentRecord({ id, title, body, rtl }) {
  return new DocumentRecord({
    id,
    title,
    body,
    rtl,
  });
}

/**
 * LocalStorage functions
 */

function loadLocalStorageItems() {
  return Object.keys(localStorage)
    .map(id => localStorage.getItem(id))
    .filter(item => item != null)
    .map((item: any) => JSON.parse(item));
}

function saveItemToLocalStorage(state, id: string) {
  // Save to local storage
  const record = state.getIn(["entities", id]);
  const data = JSON.stringify(record.toJS());
  localStorage.setItem(id, data);
}

function removeItemFromLocalStorage(id: string) {
  localStorage.removeItem(id);
}
