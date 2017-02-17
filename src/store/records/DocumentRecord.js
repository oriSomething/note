// @flow

import { Record } from "immutable";

export default class DocumentRecord
  extends Record({
    id: "",
    title: "",
    body: "",
    rtl: false,
  }) {
  id: string;
  title: string;
  body: string;
  rtl: boolean;
}
