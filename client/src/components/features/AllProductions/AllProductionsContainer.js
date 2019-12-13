import { connect } from 'react-redux';
import {
  getAllProductions,
  getUpdateRequest,
  loadProductionsRequest,
  toggleCancelProductionRequest,
  addProductionRequest,
  currentToFinished,
  resetUpdateRequest
} from '../../../redux/ordersRedux';
import AllProductions from './AllProductions';

const mapStateToProps = state => ({
  allProductions: getAllProductions(state),
  updateRequest: getUpdateRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadAllProductions: () => dispatch(loadProductionsRequest()),
  addProduction: production => dispatch(addProductionRequest(production)),
  cancelProduction: id => dispatch(toggleCancelProductionRequest(id)),
  currentToFinished: (currArr, id) => dispatch(currentToFinished(currArr, id)),
  resetRequest: () => dispatch(resetUpdateRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductions);
