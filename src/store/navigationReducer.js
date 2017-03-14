// @flow

import NavigationStateRecord, {
  EMPTY_DOCUMENT_ID,
} from "./records/NavigationStateRecord";

type ActionShowManager = {
  type: "NAVIGATION_SHOW_MANAGER",
};

type ActionSetActive = {
  type: "NAVIGATION_SET_ACTIVE_DOCUMENT",
  payload: {
    id: string,
  },
};

type ActionSetEmptyActive = {
  type: "NAVIGATION_SET_EMPTY_DOCUMENT",
};

type ActionSetOtherwise = {
  type: "NAVIGATION_SET_OTHERWISE",
};

export type Action =
  | ActionShowManager
  | ActionSetActive
  | ActionSetEmptyActive
  | ActionSetOtherwise;

export type State = NavigationStateRecord;

function getInitialState() {
  return new NavigationStateRecord();
}

export default function navigationReducer(
  state: State = getInitialState(),
  action: Action,
) {
  switch (action.type) {
    case "NAVIGATION_SHOW_MANAGER":
      return navigationShowManager(state);
    case "NAVIGATION_SET_ACTIVE_DOCUMENT":
      return navigationSetActiveDocument(state, action.payload);
    case "NAVIGATION_SET_EMPTY_DOCUMENT":
      return navigationSetEmptyDocument(state);
    case "NAVIGATION_SET_OTHERWISE":
      return navigationSetOtherwise(state);
    default:
      return state;
  }
}

function navigationShowManager(state) {
  return state.set("isManagerOpen", true);
}

function navigationSetActiveDocument(state, payload) {
  return state
    .set("activeDocument", payload.id)
    .set("otherwise", false)
    .set("isManagerOpen", false);
}

function navigationSetEmptyDocument(state) {
  return state
    .set("activeDocument", EMPTY_DOCUMENT_ID)
    .set("otherwise", false)
    .set("isManagerOpen", false);
}

function navigationSetOtherwise(state) {
  return state.set("isManagerOpen", false).set("otherwise", true);
}
