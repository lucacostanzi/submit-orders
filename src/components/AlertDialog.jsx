import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentWillReceiveProps() {
    if (this.props.dataLoadingError) {
      this.handleClickOpen();
    }
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Try to reload the orders?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There was an error loading the data.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  dataLoadingError: PropTypes.bool,
};

AlertDialog.defaultProps = {
  dataLoadingError: false,
};

export default AlertDialog;
