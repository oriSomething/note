// @flow

import React, { PropTypes } from "react";
import "./Clickable.css";

type Props = {
  onClick: () => void,
};

export default function Clickable({ onClick }: Props) {
  return <div onClick={onClick} className="Clickable" />;
}

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
};
