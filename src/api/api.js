import _ from 'lodash';

const fetchData = (endpoint, types, method = 'GET', getQuery = {}, postBody = {}) => (
  function dispatcher() {
    return function getAllOrders(dispatch) {
      if (types[0] === undefined ||
        types[1] === undefined ||
        types[2] === undefined) {
        throw new Error('Parameter types needs to be an array of action creators');
      }
      dispatch(types[0]());
      let query = '?';
      _.forOwn(getQuery, (v, k) => (query += k + '=' + v + '&'))
      let body = '';
      _.forOwn(postBody, (v, k) => (body += k + '=' + v + '&'))
      let options = {};
      if (method === 'POST') {
        options = { method, body };
      }
      return fetch(endpoint + query, options)
        .then(resp => resp.json())
        .then(resp => (
          dispatch(types[1](resp, getQuery))
        ))
        .catch(error => (
          dispatch(types[2](error, getQuery))
        ));
    };
  }
)

export default fetchData;
