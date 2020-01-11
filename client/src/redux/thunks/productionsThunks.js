import { API_URL } from '../../config';
import axios from 'axios';
import sortByColumn from '../../utils/sortByColumn';
import {
  startRequest,
  endRequest,
  errorRequest,
  startUpdateRequest,
  endUpdateRequest,
  errorUpdateRequest
} from '../actions/requestsActions';
import {
  loadProductions,
  loadCurrentProductions,
  sortCurrent,
  loadFinished,
  loadTransported,
  loadCanceled
} from '../actions/productionsActions';

//// Thunks
export const sortCurrentProductions = (
  currentProductions,
  key,
  valueType,
  direction
) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let payload = {
        sorted: sortByColumn(currentProductions, key, valueType, direction),
        sortParams: { key: key, valueType: valueType, direction: direction }
      };
      dispatch(sortCurrent(payload));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadProductionsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/productions`);
      dispatch(loadProductions(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};
export const loadCurrentProductionsRequest = (key, valueType, direction) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/productions/current`);
      sortByColumn(res.data, key, valueType, direction);
      dispatch(loadCurrentProductions(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadCanceledProductionsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/productions/canceled`);
      dispatch(loadCanceled(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};
export const loadFinishedProductionsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/productions/finished`);
      dispatch(loadFinished(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};
export const loadTransportedProductionsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/productions/transported`);
      dispatch(loadTransported(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};
export const addProductionRequest = (production, thunk) => {
  return async dispatch => {
    dispatch(startUpdateRequest());
    try {
      await axios.post(`${API_URL}/productions/add`, production);
      dispatch(thunk);
      dispatch(endUpdateRequest());
    } catch (e) {
      dispatch(errorUpdateRequest(JSON.stringify(e)));
    }
  };
};
export const deleteProductionRequest = (id, thunk) => {
  return async dispatch => {
    dispatch(startUpdateRequest());
    try {
      await axios.delete(`${API_URL}/productions/${id}`);
      dispatch(thunk);
      dispatch(endUpdateRequest());
    } catch (e) {
      dispatch(errorUpdateRequest(JSON.stringify(e)));
    }
  };
};
export const toggleCancelProductionRequest = (id, thunk) => {
  return async dispatch => {
    dispatch(startUpdateRequest());
    try {
      await axios.put(`${API_URL}/productions/cancel/${id}`);
      dispatch(thunk);
      dispatch(endUpdateRequest());
    } catch (e) {
      dispatch(errorUpdateRequest(JSON.stringify(e)));
    }
  };
};
export const toggleFinishProductionRequest = (id, thunk) => {
  return async dispatch => {
    dispatch(startUpdateRequest());
    try {
      await axios.put(`${API_URL}/productions/finish/${id}`);
      dispatch(thunk);
      dispatch(endUpdateRequest());
    } catch (e) {
      dispatch(errorUpdateRequest(JSON.stringify(e)));
    }
  };
};
export const toggleTransportProductionRequest = (id, thunk) => {
  return async dispatch => {
    dispatch(startUpdateRequest());
    try {
      await axios.put(`${API_URL}/productions/transport/${id}`);
      dispatch(thunk);
      dispatch(endUpdateRequest());
    } catch (e) {
      dispatch(errorUpdateRequest(JSON.stringify(e)));
    }
  };
};
