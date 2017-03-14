// @flow

import { type RouterType } from "./types";
import DocumentsStateRecord from "../../store/records/DocumentsStateRecord";

type RouteIndexSettings = {
  isManagerOpen: boolean,
  route: "INDEX",
};

type RouteDocumentsSettings = {
  id: number,
  isManagerOpen: boolean,
  route: "DOCUMENTS",
};

type RouteOtherwiseSettings = {
  route: "OTHERWISE",
};

type RouteSettigns =
  | RouteIndexSettings
  | RouteDocumentsSettings
  | RouteOtherwiseSettings;

type Params = {
  path: ?string,
  id: ?string,
};

export default function getCurrentRoute(
  router: RouterType,
  documents: DocumentsStateRecord,
): RouteSettigns {
  const { location, match } = router;
  const params: Params = match.params;

  // URL: https://web.com/documents
  if (params.path === "documents" && params.id == null) {
    if (documents.current === -1) {
      return {
        isManagerOpen: true,
        route: "INDEX",
      };
    } else {
      return {
        id: documents.current,
        isManagerOpen: true,
        route: "DOCUMENTS",
      };
    }
  }

  // URL: https://web.com/
  if (location.pathname === "/") {
    return {
      isManagerOpen: false,
      route: "INDEX",
    };
  }

  // URL: https://web.com/documents/777
  const id = Number(params.id);

  if (params.path === "documents" && id > 0) {
    return {
      id,
      isManagerOpen: false,
      route: "DOCUMENTS",
    };
  }

  // URL: https://web.com/*
  return {
    route: "OTHERWISE",
  };
}
