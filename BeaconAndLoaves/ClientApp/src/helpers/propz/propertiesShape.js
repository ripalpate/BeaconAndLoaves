import PropTypes from 'prop-types';

const propertiesShape = PropTypes.shape({
  PropertyName: PropTypes.string.isRequired,
  Street: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  State: PropTypes.string.isRequired,
  Zipcode: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ImageUrl: PropTypes.string.isRequired,
  Price: PropTypes.string.isRequired,
});

export default propertiesShape;