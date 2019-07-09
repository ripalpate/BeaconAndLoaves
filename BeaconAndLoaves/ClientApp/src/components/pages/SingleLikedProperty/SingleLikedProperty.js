import React from 'react';
import PropTypes from 'prop-types';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleLikedProperty.scss';
import LikeButton from '../../LikeButton/LikeButton';


class SingleLikedProperty extends React.Component {
  state = {
    isLiked: true,
  }

static propTypes = {
  likedProperty: propertiesShape,
  changeIsLikedState: PropTypes.func,
  getAllLikedProperties: PropTypes.func,
}

changePropertyToDetailView = (e) => {
  e.preventDefault();
  const propertyType = e.currentTarget.dataset.type * 1;
  const { lightHouseDetailView, siloDetailView } = this.props;
  if (propertyType === 0) {
    lightHouseDetailView(e.currentTarget.id);
  } else {
    siloDetailView(e.currentTarget.id);
  }
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
      <div className="card detail ml-4 mb-3 mt-3 animated zoomIn" id = "singleLikedProperty">
        <div id={likedProperty.propertyId} data-type={likedProperty.propertyType} onClick={this.changePropertyToDetailView}>
          <div className="imgHolder">
            <img className="singleLightHouseImg" src={likedProperty.imageUrl} alt="liked Property"/>
          </div>
          <div className="card-body">
            <h5>{likedProperty.propertyName}</h5>
            <p>{likedProperty.street}</p>
            <p>{likedProperty.city}, {likedProperty.state}, {likedProperty.zipCode}</p>
            <p>{likedProperty.description}</p>
            <p>${likedProperty.price}/per night</p>
          </div>
        </div>
        <div className=" button">
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
