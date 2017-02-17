// @flow

export type RouterMatch = {
  isExact: boolean,
  params: Object,
  path: string,
  url: string,
};

export type RouterLocation = {
  hash: string,
  pathname: string,
  search: string,
  state?: {
    autoFocus?: {
      body: boolean,
      title: boolean,
    },
  },
  key?: any,
};

export type RouterType = {
  action: "POP" | "PUSH" | "REPLACE",
  block: (prompt: ?boolean) => () => void,
  createHref: (location: RouterLocation) => string,
  go: (n: number) => void,
  goBack: () => void,
  goForward: () => void,
  length: number,
  match: RouterMatch,
  location: RouterLocation,
  push: (path: string, state: any) => void,
  replace: (path: string, state: any) => void,
};
