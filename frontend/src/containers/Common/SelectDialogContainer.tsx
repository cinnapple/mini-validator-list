import * as React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions/index";

import SelectorDialog from "../../components/Dialog/SelectorDialog";

class SelectDialogContainer extends React.Component<any, any> {
  handleSelect = value => {
    this.props.dia.handleSelect(value);
    this.props.onClose();
  };

  render() {
    const { dia, onClose } = this.props;

    return (
      <SelectorDialog
        dia={dia}
        onClose={onClose}
        onSelect={this.handleSelect}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    dia: state.selectDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => dispatch(actions.closeDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDialogContainer);
