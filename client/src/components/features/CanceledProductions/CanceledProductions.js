import React from 'react';
import { MdAttachMoney, MdMoneyOff } from 'react-icons/md';
import { PropTypes } from 'prop-types';
import { isEqual } from 'lodash';
// utils
import formatDate from '../../../utils/formatDate';
import countDaysLeft from '../../../utils/countDaysLeft';
import currentFromSquareMeters from '../../../utils/currentFromSquareMeters';
import cutText from '../../../utils/cutText';
// components
import OrderListTable from '../../common/OrderList/OrderListTable/OrderListTable';
import EditButton from '../../common/Buttons/EditButton/EditButton';
import RestoreButton from '../../common/Buttons/RestoreButton/RestoreButton';
import DeleteButton from '../../common/Buttons/DeleteButton/DeleteButton';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';

class CanceledProductions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canceledProductions: this.props.canceledProductions,
      startDate: new Date()
    };
  }

  componentDidMount() {
    const { loadCanceledProductions, sortParams } = this.props;
    loadCanceledProductions(
      sortParams.key,
      sortParams.valueType,
      sortParams.direction
    ).then(
      this.setState({ canceledProductions: this.props.canceledProductions })
    );
  }
  componentDidUpdate() {
    const { loadCanceledProductions, sortParams } = this.props;
    if (
      isEqual(
        this.state.canceledProductions,
        this.props.canceledProductions
      ) === false
    ) {
      loadCanceledProductions(
        sortParams.key,
        sortParams.valueType,
        sortParams.direction
      ).then(
        this.setState({
          canceledProductions: this.props.canceledProductions
        })
      );
    }
  }

  cancelHandler = id => {
    const { cancelProduction, loadCanceledProductions } = this.props;
    cancelProduction(id, loadCanceledProductions);
  };

  deleteHandler = id => {
    const { deleteProduction, loadCanceledProductions } = this.props;
    deleteProduction(id, loadCanceledProductions);
  };

  handleSort = (
    key = 'orderNumber',
    valueType = 'number',
    direction = 'asc'
  ) => {
    const { canceledProductions } = this.state;
    const { sortCanceledProductions } = this.props;
    sortCanceledProductions(canceledProductions, key, valueType, direction);
  };

  render() {
    const { handleSort } = this;
    const { updateRequest, request, canceledProductions } = this.props;
    const tdClass = 'production-list-td';

    if (updateRequest.error || request.error)
      return <Alert variant="error">{`${updateRequest.error}`}</Alert>;
    else if (updateRequest.pending && request.pending) return <Spinner />;
    return (
      <OrderListTable
        sortColumn={(key, valueType) => {
          handleSort(key, valueType);
        }}>
        {canceledProductions.map(production => {
          let daysLeft = countDaysLeft(
            production.downpayment,
            production.productionTerm
          );
          let daysLeftClass = 'text-default';
          switch (true) {
            case daysLeft <= 7 && daysLeft > 2:
              daysLeftClass = 'text-warning';
              break;
            case daysLeft < 3:
              daysLeftClass = 'text-danger';
              break;
            default:
              daysLeftClass = 'text-default';
          }
          return (
            <tr key={production.id} className="production-list">
              <td className={`${tdClass} short-column`}>
                {production.orderNumber}
              </td>
              <td className={`${tdClass} name-column`}>
                {cutText(production.clientName, 25)}
              </td>
              <td className={`${tdClass} date-column`}>
                {formatDate(production.downpayment)}
              </td>
              <td className={`${tdClass} short-column ${daysLeftClass}`}>
                {daysLeft}
              </td>
              <td className={`${tdClass} short-column`}>
                {production.finalPayment === true ? (
                  <MdAttachMoney className="text-success" />
                ) : (
                  <MdMoneyOff className="text-danger" />
                )}
              </td>
              <td className={`${tdClass} short-column`}>{production.type}</td>
              <td className={`${tdClass}`}>{production.colorOutside}</td>
              <td className={`${tdClass}`}>{production.colorInside}</td>
              <td className={`${tdClass} short-column`}>{production.core}</td>
              <td className={`${tdClass} short-column`}>
                {production.thickness}
              </td>

              <td className={`${tdClass}`}>{production.m2}</td>
              <td className={`${tdClass}`}>
                {currentFromSquareMeters(production.type, production.m2)}
              </td>
              <td className={`${tdClass} short-column`}>{production.csa}</td>
              <td className={`${tdClass} production-list-buttons noprint`}>
                <span className="buttons-nowrap">
                  <EditButton />
                  <RestoreButton
                    clickHandler={() => {
                      this.cancelHandler(production.id);
                    }}
                  />
                  <DeleteButton
                    clickHandler={() => {
                      this.deleteHandler(production.id);
                    }}
                  />
                </span>
              </td>
            </tr>
          );
        })}
      </OrderListTable>
    );
  }
}

export default CanceledProductions;

CanceledProductions.propTypes = {
  updateRequest: PropTypes.object.isRequired,
  canceledProductions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      orderNumber: PropTypes.string,
      clientName: PropTypes.string,
      downpayment: PropTypes.string,
      productionTerm: PropTypes.number,
      finalPayment: PropTypes.bool,
      finished: PropTypes.bool.isRequired,
      type: PropTypes.string,
      colorOutside: PropTypes.string,
      colorInside: PropTypes.string,
      core: PropTypes.string,
      thickness: PropTypes.number,
      m2: PropTypes.number,
      csa: PropTypes.string
    })
  ),
  loadPostsByPage: PropTypes.func
};
