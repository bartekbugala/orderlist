import axios from 'axios';
//import { API_URL } from '../config';

//// Initial state
const initialState = {
  menuLinks: [
    { path: '/current', title: 'Bieżące' },
    { path: '/finished', title: 'Zrealizowane' },
    { path: '/', title: 'Anulowane' },
    { path: '/', title: 'Wszystkie' },
    { path: '/', title: 'Statystyki' }
  ],
  currentProductions: [
    {
      id: '1234',
      orderNumber: 100,
      clientName: 'Bud-Mar-Rem',
      downpayment: '11-05-2019',
      productionTerm: 21,
      finalpayment: false,
      salesperson: 'BB',
      type: 'S',
      core: 'St',
      thickness: 100,
      color: '9002',
      m2: 12000
    },
    {
      id: '123456',
      orderNumber: 103,
      clientName: 'Bud-Mar-Rem SP. Z oo i świnia',
      downpayment: '11-05-2019',
      productionTerm: 48,
      finalpayment: true,
      salesperson: 'BB',
      type: 'SP-L',
      core: 'XPS',
      thickness: 25,
      color: 'biały',
      m2: 20.44
    },
    {
      id: '1234567',
      orderNumber: 104,
      clientName: 'Ojeje',
      downpayment: '11-05-2019',
      productionTerm: 21,
      finalpayment: false,
      salesperson: 'BB',
      type: 'S',
      core: 'Wm',
      thickness: 100,
      color: '9002',
      m2: 12000
    }
  ],
  finishedProductions: [
    {
      id: '12345',
      finished: true,
      delivered: false,
      orderNumber: 102,
      clientName: 'XXXXXa',
      downpayment: '11-05-2019',
      productionTerm: 48,
      finalpayment: true,
      salesperson: 'BB',
      type: 'SP-L',
      core: 'XPS',
      thickness: 25,
      color: 'biały',
      m2: 20.44
    }
  ],
  updateRequest: {
    pending: false,
    error: null,
    success: null
  },
  ordersPerPage: 10,
  presentPage: 1,
  request: {
    pending: false,
    error: null,
    success: null
  }
};

//// Selectors
export const getMenuLinks = ({ orders }) => orders.menuLinks;
export const getCurrentProductions = ({ orders }) => orders.currentProductions;
export const getFinishedProductions = ({ orders }) =>
  orders.finishedProductions;

//// Thunks
/*
currentProductions.filter(
  el => el.id === action.payload.id
)*/
export const currentToFinished = (currArr, id) => {
  console.log(id, currArr);
  return dispatch => {
    const movedIndex = currArr
      .map(e => {
        return e.id;
      })
      .indexOf(id);
    const payload = currArr[movedIndex];
    const currArrNew = currArr.filter(el => el.id !== id);
    dispatch(finishProduction(payload, currArrNew));
  };
};
/* export const loadOrdersRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/orders`);
      dispatch(loadOrders(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadSingleOrderRequest = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/orders/${id}`);
      dispatch(loadSingleOrder(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
}; */

//// Actions
// action name creator
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

// action exports
export const FINISH_PRODUCTION = createActionName('FINISH_PRODUCTION');

export const LOAD_ORDERS = createActionName('LOAD_ORDERS');

export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const START_UPDATE_REQUEST = createActionName('START_UPDATE_REQUEST');
export const END_UPDATE_REQUEST = createActionName('END_UPDATE_REQUEST');
export const RESET_UPDATE_REQUEST = createActionName('RESET_UPDATE_REQUEST');
export const ERROR_UPDATE_REQUEST = createActionName('ERROR_UPDATE_REQUEST');

export const finishProduction = (payload, currArrNew) => ({
  payload,
  currArrNew,
  type: FINISH_PRODUCTION
});

export const loadOrders = payload => ({ payload, type: LOAD_ORDERS });

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const startUpdateRequest = () => ({ type: START_UPDATE_REQUEST });
export const endUpdateRequest = () => ({ type: END_UPDATE_REQUEST });
export const resetUpdateRequest = () => ({ type: RESET_UPDATE_REQUEST });
export const errorUpdateRequest = error => ({
  error,
  type: ERROR_UPDATE_REQUEST
});

//// Reducer
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case FINISH_PRODUCTION:
      return {
        ...statePart,
        finishedProductions: [...statePart.finishedProductions, action.payload],
        currentProductions: action.currArrNew
      };
    case LOAD_ORDERS:
      return { ...statePart, data: action.payload };
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: null }
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true }
      };
    case RESET_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: null }
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: action.error, success: true }
      };
    case START_UPDATE_REQUEST:
      return {
        ...statePart,
        updateRequest: { pending: true, error: null, success: null }
      };
    case END_UPDATE_REQUEST:
      return {
        ...statePart,
        updateRequest: { pending: false, error: null, success: true }
      };
    case RESET_UPDATE_REQUEST:
      return {
        ...statePart,
        updateRequest: { pending: false, error: null, success: null }
      };
    case ERROR_UPDATE_REQUEST:
      return {
        ...statePart,
        updateRequest: { pending: false, error: action.error, success: true }
      };
    default:
      return statePart;
  }
}
