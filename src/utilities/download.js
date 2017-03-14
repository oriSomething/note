// @flow

export default function download(title: string, body: string) {
  const filename = (!title ? "untitled" : title) + ".txt";
  const blob = new Blob([body], {
    type: "text/plain",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.target = "_blank";
  link.download = filename;
  link.href = url;

  link.click();

  requestIdleCallback(function() {
    URL.revokeObjectURL(url);
  });
}
