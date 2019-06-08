import React from 'react';
import PropTypes from 'prop-types';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleOwnerProperty.scss';

class SingleOwnerProperty extends React.Component {
  static propTypes = {
    property: propertiesShape,
    rentProperty: PropTypes.func.isRequired,
  }

  toggleRent = (e) => {
    const propertyId = e.target.id;
    this.props.rentProperty(propertyId);
  }
  render() {
    const { property, rentProperty } = this.props;

    return (
        <div className="card mx-auto bg-light detail">
            <div className="imgHolder">
                <img className="singleLightHouseImg"src={property.imageUrl} alt="property"/>
            </div>
            <div className="card-body property-body">
                <h5>{property.propertyName}</h5>
                <p>{property.street}</p>
                <p>{property.city}, {property.state} - {property.zipCode}</p>
                <p>{property.description}</p>
                <p>${property.price}/per night</p>
                <button id={property.id} className="bttn-pill bttn-md bttn-primary mr-2" onClick={this.toggleRent}>Rent Me!!!</button>
            </div>
        </div>
    );
  }
}

export default SingleOwnerProperty;
