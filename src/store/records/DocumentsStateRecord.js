// @flow

import { Map, Record } from "immutable";
import DocumentRecord from "./DocumentRecord";

export default class DocumentsStateRecord
  extends Record({
    entities: new Map(),
    rtl: false,
  }) {
  entities: Map<string, DocumentRecord>;
  rtl: boolean;
}
