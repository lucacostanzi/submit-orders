import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrdersList from '../components/OrdersList';
import { setItemsQuantity, handleSubmitOrder, getAllData } from '../actions/index';

const mapStateToProps = (state) => {
  const getObjectById = function (list, id) {
    return list.length > 0
      ? _.find(list, { id })
      : null;
  };
  const getCustomer = id => getObjectById(state.customerStore.customers, id);
  const getProduct = id => getObjectById(state.productsStore.products, id);
  const getCategory = id => getObjectById(state.categoriesStore.categories, id);
  const getProductData = items => items.map((item) => {
    const productInfo = getProduct(item['product-id']);
    const category = getCategory(productInfo.category);
    return Object.assign({}, item, {
      productInfo,
      category,
    });
  });
  const getFullOrders = orders => orders.map(order => Object.assign({}, order, {
    customer: state.customerStore.customers.length > 0 ? getCustomer(order['customer-id']) : null,
    items: state.productsStore.products.length > 0 && state.categoriesStore.categories.length > 0
      ? getProductData(order.items)
      : null,
  }));
  const fullOrders = getFullOrders(state.ordersStore.orders);
  return {
    orders: fullOrders,
    dataLoadingError: state.ordersStore.dataLoadingError ||
    state.categoriesStore.dataLoadingError ||
    state.productsStore.dataLoadingError ||
    state.customerStore.dataLoadingError,
  };
};

const mapDispatchToProps = dispatch => ({
  handleOnChange: (e, orderId, itemId) => {
    dispatch(setItemsQuantity(orderId, itemId, e.target.value));
  },
  handleSubmitOrder: (e, orderId, order) => {
    dispatch(handleSubmitOrder(orderId, order)());
  },
  reloadData: () => {
    dispatch(getAllData());
  },
});

class OrdersAppContainer extends React.Component {
  componentDidMount() {
    if (this.props.orders === null || this.props.orders.length === 0){
      this.props.reloadData();
    }
  }

  render() {
    return (<OrdersList {...this.props} />);
  }
}

OrdersAppContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  reloadData: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersAppContainer);
