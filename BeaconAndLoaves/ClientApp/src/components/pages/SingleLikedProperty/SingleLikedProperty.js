import React from 'react';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleLikedProperty.scss';



class SingleLikedProperty extends React.Component {
  static propTypes = {
    likedProperty: propertiesShape
  }

  render() {
    const {likedProperty} = this.props;
    return (
      <div className="card mx-auto bg-light">
      <div className="imgHolder">
        <img className="singleLightHouseImg" src={likedProperty.imageUrl} alt="liked Property"/>
      </div>
      <div className="card-body">
        <h5>{likedProperty.propertyName}</h5>
        <p>{likedProperty.street}</p>
        <p>{likedProperty.city}, {likedProperty.state} - {likedProperty.zipCode}</p>
        <p>{likedProperty.description}</p>
        <p>${likedProperty.price}/per night</p>
        <button className="btn btn-primary mr-2">Rent</button>
      </div>
    </div>
    );
  }
}

export default SingleLikedProperty;