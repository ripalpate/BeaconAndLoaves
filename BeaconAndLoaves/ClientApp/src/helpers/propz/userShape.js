import PropTypes from 'prop-types';

const currentUserShape = PropTypes.shape({
  email: PropTypes.string.isRequired,
  firebaseId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
  rentals: PropTypes.array.isRequired,
  userPayments: PropTypes.array.isRequired,
});

export default currentUserShape;
