import React from 'react';
import { AppBar, Toolbar, Typography, Button, withStyles } from 'material-ui';
import CachedIcon from 'material-ui-icons/Cached';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

const Header = ({ reloadData, classes }) => {
  return (
    <AppBar color='primary' position='fixed'>
      <Toolbar>
        <Typography variant='title' color='inherit' className={classes.flex}>
          Orders Manager
        </Typography>
        <Button
          variant='fab'
          color='primary'
          aria-label='refresh'
          mini
          onClick={reloadData}
        >
          <CachedIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  reloadData: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(Header);
