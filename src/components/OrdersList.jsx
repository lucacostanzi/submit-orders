/**
 * Created by luca on 12/03/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableRow, TableCell, TableHead, TableFooter } from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import AlertDialog from './AlertDialog';
import Header from './Header';
import styles from '../styles/styles';

const OrdersList = ({
  orders, handleOnChange, handleSubmitOrder, dataLoadingError, classes, reloadData,
}) => (
  <div>
    <Header reloadData={reloadData} />
    <div className={classes.root} >
      {orders.map(order => (
        <Collapse in={!order.submitted} mountOnEnter unmountOnExit key={order.id} >
          <Grid direction="row" container spacing={24} >
            <Grid item xs={12} >
              <Paper className={classes.paper} >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={5} >
                        <Typography
                          variant="subheading"
                          color="inherit"
                          className={[classes.center, classes.flex].join(' ')}
                        >
                          {order.customer && `${order.customer.name} (${order.customer.since})`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell className={classes.price} >Unit Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell className={classes.price} >Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items && order.items.map(product =>
                      (
                        <TableRow key={product['product-id']} >
                          <TableCell>
                            {product.productInfo.description}
                          </TableCell>
                          <TableCell>
                            {product.category.name}
                          </TableCell>
                          <TableCell className={classes.price} >
                            € {product.productInfo.price}
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={product.quantity}
                              error={product.error}
                              type="number"
                              onChange={e => handleOnChange(e, order.id, product['product-id'])}
                            />
                          </TableCell>
                          <TableCell className={classes.price} >
                            € {product.total}
                          </TableCell>
                        </TableRow>))}
                    {!order.items &&
                    <TableRow>
                      <TableCell colSpan={5} >
                        There are no products
                      </TableCell>
                    </TableRow>}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5} className={classes.price} >
                        Total: € {order.total}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} className={classes.price} >
                        <Button
                          mini
                          variant="raised"
                          color="primary"
                          disabled={order.error}
                          onClick={e => handleSubmitOrder(e, order.id, order)}
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                    {order.submissionError &&
                    <TableRow>
                      <TableCell colSpan={5} className="error" >
                        There was an error while submitting the order.
                      </TableCell>
                    </TableRow>
                    }
                  </TableFooter>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Collapse>
      ))}
      <AlertDialog
        dataLoadingError={dataLoadingError}
      />
    </div>
  </div>
);


OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSubmitOrder: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
  dataLoadingError: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(OrdersList);
