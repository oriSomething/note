// @flow

import createHistory from "history/createHashHistory";

export type HistoryAction = "PUSH" | "POP" | "REPLACE";

export type HistoryHashLocation = {
  pathname: string,
  search?: string,
  hash?: string,
};

export type HistoryHash = {
  createHref: (location: HistoryHashLocation) => void,
  go: (n: number) => void,
  goBack: () => void,
  goForward: () => void,
  length: number,
  listen: (
    cb: (location: HistoryHashLocation, action: HistoryAction) => any,
  ) => () => void,
  location: HistoryHashLocation,
  push: (path: string | HistoryHashLocation, state: any) => void,
  replace: (path: string | HistoryHashLocation, state: any) => void,
};

const history: HistoryHash = createHistory();

export default history;

window._history = history;
