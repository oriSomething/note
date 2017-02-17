// @flow

import { connect } from "react-redux";
import type { Action, State } from "./navigationReducer";

type DispatchToProps = {};

type StateToProps = {
  navigation: State,
};

export type Props = StateToProps & DispatchToProps;

type Dispatcher = (value: Action) => void;

export default connect(mapStateToProps, mapDispatchToProps);

function mapStateToProps(state): StateToProps {
  return state;
}

function mapDispatchToProps(dispatch: Dispatcher): DispatchToProps {
  return {};
}
