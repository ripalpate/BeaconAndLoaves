import React from 'react';
import PropTypes from 'prop-types';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleLikedProperty.scss';
import LikeButton from '../LikeButton/LikeButton';


class SingleLikedProperty extends React.Component {
  state = {
    isLiked: true,
  }
  static propTypes = {
    likedProperty: propertiesShape,
    changeIsLikedState: PropTypes.func,
    refreshLikedProperties: PropTypes.func
  }

  changeIsLikedState = () => {
    const{refreshLikedProperties} = this.props;
    const { isLiked } = this.state;
    this.setState({ isLiked: !isLiked }, refreshLikedProperties());
  }

  render() {
    const {isLiked} =this.state;
    const {likedProperty} = this.props;
    return (
      <div className="card bg-light mr-4 mb-4 singleLikedProperty">
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
          <LikeButton
            isLiked={isLiked}
            changeIsLikedState= {this.changeIsLikedState}
            userId = {likedProperty.userId}
            propertyId = {likedProperty.propertyId}
            />
        </div>
      </div>
    );
  }
}

export default SingleLikedProperty;