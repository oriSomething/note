// @flow

import { Record } from "immutable";

export const EMPTY_DOCUMENT_ID = "";

export default class NavigationStateRecord
  extends Record({
    activeDocument: EMPTY_DOCUMENT_ID,
    autoFocus: "BODY",
    isManagerOpen: false,
    otherwise: false,
  }) {
  activeDocument: string;
  autoFocus: "BODY" | "TITLE";
  isManagerOpen: boolean;
  otherwise: boolean;
}
