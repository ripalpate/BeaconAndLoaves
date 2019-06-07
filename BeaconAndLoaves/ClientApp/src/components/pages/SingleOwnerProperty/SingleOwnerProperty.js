import React from 'react';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleOwnerProperty.scss';



class SingleOwnerProperty extends React.Component {
  static propTypes = {
    property: propertiesShape
  }

  render() {
    const {property} = this.props;

    return (
        <div>
            <div className="card mx-auto bg-light detail">
            <div className="imgHolder">
                <img className="singleLightHouseImg"src={property.imageUrl} alt="property"/>
            </div>
            <div className="card-body">
                <h5>{property.propertyName}</h5>
                <p>{property.street}</p>
                <p>{property.city}, {property.state} - {property.zipCode}</p>
                <p>{property.description}</p>
                <p>${property.price}/per night</p>
                <button className="btn btn-primary mr-2">Rent</button>
            </div>
            </div>
        </div>
    );
  }
}

export default SingleOwnerProperty;
