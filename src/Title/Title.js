// @flow

import { Component, PropTypes } from "react";

type Props = {
  title: string,
};

export default class Title extends Component {
  props: Props;

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  timeoutId = 0;

  updateTitle = () => {
    const { title } = this.props;
    const documentTitle = title.trim() ? `NOTE - ${title}` : "NOTE";

    if (document.title !== documentTitle) {
      document.title = documentTitle;
    }
  };

  render() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.updateTitle, 30);

    return null;
  }
}
