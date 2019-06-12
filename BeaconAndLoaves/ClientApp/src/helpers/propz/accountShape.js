import PropTypes from 'prop-types';

const accountShape = PropTypes.shape({
  accountName: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  paymentTypeId: PropTypes.number.isRequired,
  accountNumber: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  cvv: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
});

export default accountShape;
