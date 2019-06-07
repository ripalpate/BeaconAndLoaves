import PropTypes from 'prop-types';

const currentUserShape = PropTypes.shape({
  firebaseId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
});

export default currentUserShape;
