// @flow

declare var crypto: {
  getRandomValues: (a: Uint8Array) => Uint8Array,
};

export default function createId(size: number = 8): string {
  let uuid = crypto.getRandomValues(new Uint8Array(size));
  let s = "";

  for (let v of uuid) {
    s += v.toString(36);
  }

  return s;
}
