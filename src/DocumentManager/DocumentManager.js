// @flow

import cx from "classnames";
import React, { Component, PropTypes } from "react";
import { spring, Motion } from "react-motion";
import Link from "../routing/Link";
import * as Icons from "../Icons/Icons";
import documentsConnector, {
  type Props as DocumentsProps,
} from "../store/documentsConnector";
import navigationConnector, {
  type Props as NavigationProps,
} from "../store/navigationConnector";
import "./DocumentManager.css";

type Props = DocumentsProps & NavigationProps & {
  isOpen?: boolean,
  onClose?: () => void,
};

type State = {
  filter: string,
  mount: boolean,
};

class DocumentManager extends Component {
  props: Props;
  state: State;
  searchElement: HTMLInputElement;

  static propTypes = {
    documents: PropTypes.shape({
      entities: PropTypes.object.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool,
    navigation: PropTypes.shape({
      activeDocument: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func,
  };

  constructor(props: Props) {
    super(...arguments);

    this.state = {
      filter: "",
      mount: props.isOpen || false,
    };
  }

  getTitleOfDocument(doc) {
    if (doc.title) {
      return doc.title;
    }

    return doc.rtl ? "ללא כותרת" : "Untitled";
  }

  getBodyOfDocument(doc) {
    if (doc.body.length > 200) {
      return doc.body.substr(0, 200) + "…";
    }

    if (doc.body.length === 0) {
      return doc.rtl ? "(ללא תוכן)" : "(No content)";
    }

    return doc.body;
  }

  getDocuments() {
    const { documents } = this.props;
    const { navigation } = this.props;
    const filter = this.state.filter.trim();

    const iterable = documents.entities
      .filter(doc => {
        if (filter === "") return true;

        return doc.body.includes(filter) || doc.title.includes(filter);
      })
      .map((doc, id) => {
        return {
          id,
          isActive: navigation.activeDocument === id,
          to: `/documents/${id}`,
          title: this.getTitleOfDocument(doc),
          body: this.getBodyOfDocument(doc),
        };
      })
      .values();

    return [...iterable];
  }

  close() {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  handleClose = () => {
    this.close();
  };

  handleKeyDown = (event: SyntheticKeyboardEvent) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  handleFilterChange = (event: SyntheticInputEvent) => {
    this.setState({ filter: event.target.value });
  };

  handleAnimationEnd = () => {
    if (this.props.isOpen) {
      this.searchElement.focus();
    } else {
      this.setState({ mount: false });
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.isOpen && this.props.isOpen) {
      this.setState({ filter: "" });
    }

    if (nextProps.isOpen) {
      this.setState({ mount: true });
    }
  }

  render() {
    const { isOpen } = this.props;
    const { filter, mount } = this.state;

    return (
      <Motion
        onRest={this.handleAnimationEnd}
        defaultStyle={{ y: 0, opacity: 1 }}
        style={{
          y: spring(isOpen ? 0 : 75),
          opacity: spring(isOpen ? 1 : 0),
        }}>
        {styles => {
          if (!mount) return null;

          const allDocuments = this.getDocuments();
          return (
            <section
              onKeyDown={this.handleKeyDown}
              className="DocumentManager"
              style={{
                opacity: styles.opacity,
                transform: `translateY(${styles.y}%)`,
              }}>
              <button
                type="button"
                onClick={this.handleClose}
                aria-label="close"
                className="DocumentManager__buttonClose">
                <Icons.Close />
              </button>

              <input
                type="text"
                autoFocus
                onChange={this.handleFilterChange}
                placeholder="Filter results"
                value={filter}
                ref={e => this.searchElement = e}
                className="DocumentManager__search"
              />

              <div className="DocumentManager__results">
                {allDocuments.length === 0
                  ? <p className="DocumentManager__noItems">
                      There are no documents
                    </p>
                  : <ol className="DocumentManager__items">
                      {allDocuments.map(doc => {
                        return (
                          <li key={doc.id} className="DocumentManager__item">
                            <Link
                              to={doc.to}
                              className={cx({
                                "DocumentManager__item__link--active": doc.isActive,
                              })}>
                              {doc.title} – {doc.body}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>}
              </div>
            </section>
          );
        }}
      </Motion>
    );
  }
}
export default navigationConnector(documentsConnector(DocumentManager));
