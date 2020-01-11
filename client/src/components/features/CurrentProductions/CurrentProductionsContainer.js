import { connect } from 'react-redux';
import {
  sortCurrentProductions,
  loadCurrentProductionsRequest,
  toggleCancelProductionRequest,
  toggleFinishProductionRequest,
  addProductionRequest,
  resetUpdateRequest,
  resetRequest
} from '../../../redux/reducers/productions';
import {
  getCurrentProductions,
  getUpdateRequest,
  getRequest,
  getSortParams
} from '../../../redux/selectors';
import CurrentProductions from './CurrentProductions';

const mapStateToProps = state => ({
  currentProductions: getCurrentProductions(state),
  updateRequest: getUpdateRequest(state),
  sortParams: getSortParams(state),
  request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
  loadCurrentProductions: (
    key = 'orderNumber',
    valueType = 'number',
    direction = 'asc'
  ) => dispatch(loadCurrentProductionsRequest(key, valueType, direction)),
  sortCurrentProductions: (currentProductions, key, valueType, direction) =>
    dispatch(
      sortCurrentProductions(currentProductions, key, valueType, direction)
    ),
  addProduction: (production, thunk) =>
    dispatch(addProductionRequest(production, thunk)),
  cancelProduction: (id, thunk) =>
    dispatch(toggleCancelProductionRequest(id, thunk)),
  finishProduction: (id, thunk) =>
    dispatch(toggleFinishProductionRequest(id, thunk)),
  resetUpdateRequest: () => dispatch(resetUpdateRequest()),
  resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProductions);
