import React from 'react';
import PropTypes from 'prop-types';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import LikeButton from '../../LikeButton/LikeButton';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import './SingleOwnerProperty.scss';

class SingleOwnerProperty extends React.Component {
  state = {
    isLiked: false,
    currentLikedProperty: [],
  }

  static propTypes = {
    property: propertiesShape,
    lightHouseDetailView: PropTypes.func.isRequired,
    siloDetailView: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
  }

  changePropertyToDetailView = (e) => {
    e.preventDefault();
    const { lightHouseDetailView, siloDetailView } = this.props;
    if (e.currentTarget.dataset.type === 0) {
      lightHouseDetailView(e.currentTarget.id);
    }
    siloDetailView(e.currentTarget.id);
  }

  // clicking onheart icon changes isLiked state
  changeIsLikedState = () => {
    const { isLiked } = this.state;
    this.setState({ isLiked: !isLiked });
  }

  // check property exist in the state to hold the state of isLiked property
  checkExistingProperty = () => {
    const { property, currentUser } = this.props;
    const { isLiked } = this.state;
    likedPropertyRequests.getAllLikedPropertiesWithUser()
      .then((likedProperties) => {
        const currentLikedProperty = likedProperties.filter(lp => lp.propertyId === property.id && lp.userId === currentUser.id);
        if (currentLikedProperty.length >= 1) {
          this.setState({ isLiked: !isLiked });
          this.setState({ currentLikedProperty });
        } else {
          this.setState({ isLiked });
        }
      });
  }

  componentDidMount() {
    this.checkExistingProperty();
  }

  render() {
    const { property, currentUser } = this.props;
    const { isLiked } = this.state;

    const makeLikedPropertyButton = () => {
      if (property.ownerId !== currentUser.id) {
        return (
          <LikeButton
          isLiked={isLiked}
          changeIsLikedState= {this.changeIsLikedState}
          property = {property}
          userId = {currentUser.id}
          propertyId = {property.id}
          />
        );
      }
      return (<span></span>);
    };

    return (
        <div className="card detail singleOwnerProperties ml-4 mb-3 mt-3 animated zoomIn">
            <div id={property.id} data-type={property.type} onClick={this.changePropertyToDetailView}>
            <div className="imgHolder">
                <img className="singleLightHouseImg"src={property.imageUrl} alt="property"/>
            </div>
            <div className="card-body property-body">
                <h5>{property.propertyName}</h5>
                <p>{property.street}</p>
                <p>{property.city}, {property.state} - {property.zipCode}</p>
                <p>{property.description}</p>
                <p>${property.price}/per night</p>
            </div>
            </div>
            <div className=" button">{makeLikedPropertyButton()}</div>
        </div>
    );
  }
}

export default SingleOwnerProperty;
