// @flow

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import history from "../utilities/history";
import documentsReducer from "./documentsReducer";
import navigationReducer from "./navigationReducer";
import navigationMiddleware from "./navigationMiddleware";
import DevTools from "../DevTools/DevTools";

const reducers = combineReducers({
  documents: documentsReducer,
  navigation: navigationReducer,
});

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk, navigationMiddleware(history)),
    DevTools.instrument(),
  ),
);
