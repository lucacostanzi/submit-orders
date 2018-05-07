
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 1000,
    margin: 'auto',
    marginTop: 100,
  },
  bar: {
    width: 1000,
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  price: {
    textAlign: 'right',
  },
  flex: {
    flex: 1,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  center: {
    textAlign: 'center',
  },
});

export default styles;
