// @flow

import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import DevTools from "./DevTools/DevTools";
import Application from "./Application/Application";
import store from "./store/store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Application />
      {process.env.NODE_ENV === "development"
        ? <div style={{ fontSize: "14px" }}>
            <DevTools />
          </div>
        : null}
    </div>
  </Provider>,
  document.getElementById("root"),
);
