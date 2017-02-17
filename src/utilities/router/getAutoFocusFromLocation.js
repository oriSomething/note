// @flow

import { type RouterLocation } from "./types";

export default function getAutoFocusFromLocation(location: RouterLocation) {
  if (location && location.state && location.state.autoFocus) {
    return location.state.autoFocus;
  }
}
