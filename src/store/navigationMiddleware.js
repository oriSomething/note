// @flow

import pathToRegexp from "path-to-regexp";
import type { Middleware } from "redux";
import type { Action as NavigationAction } from "./navigationReducer";
import type { HistoryHashLocation, HistoryHash } from "../utilities/history";

const documentsRe = pathToRegexp("/documents");
const documentsDocumentRe = pathToRegexp("/documents/:id");

function dispatchNavigation(dispatch, location: HistoryHashLocation) {
  let match;

  // URL: www.com/
  if (location.pathname === "/") {
    return dispatch({
      type: "NAVIGATION_SET_EMPTY_DOCUMENT",
    });
  }

  // URL: www.com/documents
  if (documentsRe.test(location.pathname)) {
    return dispatch({
      type: "NAVIGATION_SHOW_MANAGER",
    });
  }

  // URL: www.com/documents/123
  match = documentsDocumentRe.exec(location.pathname);
  if (Array.isArray(match)) {
    let id = match[1];

    return dispatch({
      type: "NAVIGATION_SET_ACTIVE_DOCUMENT",
      payload: { id },
    });
  }

  // URL: www.com/*
  return dispatch({
    type: "NAVIGATION_SET_OTHERWISE",
  });
}

export default function navigationMiddleware(
  history: HistoryHash,
): Middleware<*, NavigationAction> {
  return store => {
    const dispatch = store.dispatch;

    history.listen(location => dispatchNavigation(dispatch, location));
    dispatchNavigation(dispatch, history.location);

    return next => action => next(action);
  };
}
