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
  getAllLikedProperties: PropTypes.func,
}

changeLightHouseToDetailView = (e) => {
  e.preventDefault();
  const { lightHouseDetailView } = this.props;
  lightHouseDetailView(e.currentTarget.id);
}

changeIsLikedState = () => {
  const { isLiked } = this.state;
  this.setState({ isLiked: !isLiked });
}

rentButtonClickEvent = (e) => {
  const propertyId = e.target.id * 1;
  this.props.rentProperty(propertyId);
}

componentDidUpdate() {
  const { isLiked } = this.state;
  if (isLiked === false) {
    this.props.getAllLikedProperties();
  }
}

render() {
  const { isLiked } = this.state;
  const { likedProperty } = this.props;
  return (
      <div id={likedProperty.propertyId} data-type={likedProperty.propertyType} className="card bg-light mr-4 mb-4 singleLikedProperty text-center" onClick={this.changeLightHouseToDetailView}>
        <div className="imgHolder">
          <img className="singleLightHouseImg" src={likedProperty.imageUrl} alt="liked Property"/>
        </div>
        <div className="card-body">
          <h5>{likedProperty.propertyName}</h5>
          <p>{likedProperty.street}</p>
          <p>{likedProperty.city}, {likedProperty.state}, {likedProperty.zipCode}</p>
          <p>{likedProperty.description}</p>
          <p>${likedProperty.price}/per night</p>
          {/* <button className="bttn-pill bttn-md bttn-primary" id={likedProperty.propertyId} onClick={this.rentButtonClickEvent}>Rent Me!!!</button> */}
          <LikeButton
            isLiked={ isLiked }
            changeIsLikedState= { this.changeIsLikedState }
            userId = { likedProperty.userId }
            propertyId = { likedProperty.propertyId }
            />
        </div>
      </div>
  );
}
}

export default SingleLikedProperty;
