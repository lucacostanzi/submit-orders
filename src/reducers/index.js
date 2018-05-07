import * as types from '../actions/actionTypes';

export const ordersStore = (state = {
  orders: [],
  status: 'idle',
  dataLoadingError: false,
  loaded: false,
}, action) => {
  switch (action.type) {
    case types.REQUEST_ORDERS:
      return Object.assign({}, state, { status: 'loading', dataLoadingError: false });
    case types.FETCH_ORDERS_SUCCESS:
      return Object.assign({}, state, {
        orders: action.payload,
        status: 'idle',
        dataLoadingError: false,
        loaded: true,
      });
    case types.FETCH_ORDERS_FAIL:
      return Object.assign({}, state, { status: 'idle', dataLoadingError: true });
    case types.SET_ITEMS_QUANTITY: {
      const { quantity } = action;
      if (quantity.length > 5) {
        return state;
      }
      const valueToInt = (value) => {
        return ((/^([0-9]+)$/.test(value)) ? Number(value) : NaN);
      };
      const isValueValid = value => !Number.isNaN(valueToInt(value));

      const orders = state.orders.map((order) => {
        if (order.id !== action.orderId) {
          return order;
        }
        const error = !isValueValid(quantity);
        const items = order.items.map((item) => {
          const total = !error ? (quantity * item['unit-price']).toFixed(2) : 0.00;
          return item['product-id'] !== action.itemId
            ? item
            : Object.assign({}, item, { quantity, total, error });
        });
        const total = !error
          ? items.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0).toFixed(2)
          : 0.00;
        return Object.assign({}, order, { items, total, error });
      });
      return Object.assign({}, state, { orders });
    }
    case types.SUBMIT_ORDER:
      return Object.assign({}, state, { status: 'loading' });
    case types.SUBMIT_ORDER_SUCCESS: {
      const ordersSub = state.orders.map(order => (
        order.id !== action.query.orderId
          ? order
          : Object.assign({}, order, { submitted: true })
      ));
      return Object.assign({}, state, { orders: ordersSub, status: 'idle' });
    }
    case types.SUBMIT_ORDER_FAIL: {
      const ordersSub = state.orders.map(order => (
        order.id !== action.query.orderId
          ? order
          : Object.assign({}, order, { submissionError: true })
      ));
      return Object.assign({}, state, { orders: ordersSub, status: 'idle' });
    }
    default:
      return state;
  }
};

export const customerStore = (state = { customers: [], status: 'idle', dataLoadingError: false }, action) => {
  switch (action.type) {
    case types.REQUEST_CUSTOMERS:
      return Object.assign({}, state, { status: 'loading', dataLoadingError: false });
    case types.FETCH_CUSTOMERS_SUCCESS:
      return Object.assign({}, state, { customers: action.payload, status: 'idle', dataLoadingError: false });
    case types.FETCH_CUSTOMERS_FAIL:
      return Object.assign({}, state, { status: 'idle', dataLoadingError: true });
    default:
      return state;
  }
};

export const categoriesStore = (state = { categories: [], status: 'idle', dataLoadingError: false }, action) => {
  switch (action.type) {
    case types.REQUEST_CATEGORIES:
      return Object.assign({}, state, { status: 'loading', dataLoadingError: false });
    case types.FETCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, { categories: action.payload, status: 'idle', dataLoadingError: false });
    case types.FETCH_CATEGORIES_FAIL:
      return Object.assign({}, state, { status: 'idle', dataLoadingError: true });
    default:
      return state;
  }
};

export const productsStore = (state = { products: [], status: 'idle', dataLoadingError: false }, action) => {
  switch (action.type) {
    case types.REQUEST_PRODUCTS:
      return Object.assign({}, state, { status: 'loading' });
    case types.FETCH_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { products: action.payload, status: 'idle' });
    case types.FETCH_PRODUCTS_FAIL:
      return Object.assign({}, state, { status: 'idle', dataLoadingError: true });
    default:
      return state;
  }
};

