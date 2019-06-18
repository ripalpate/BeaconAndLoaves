import React from 'react';
import PropTypes from 'prop-types';
import './LightHouseDetail.scss';
import smashRequests from '../../../helpers/data/smashRequests';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import LikeButton from '../LikeButton/LikeButton';

class LightHouseDetail extends React.Component {
  lightHouseDetailMounted = false;

  state = {
    currentLikedProperty: [],
    lightHouse: [],
    isLiked: false,
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  componentDidMount() {
    this.lightHouseDetailMounted = true;
    if (this.lightHouseDetailMounted) {
      this.getPropertyWithOwnerName();
    }
  }

  componentWillUnmount() {
    this.lightHouseDetailMounted = false;
  }

  // get Propertydetails with owner name and hold isLiked state
  getPropertyWithOwnerName = () => {
    const lightHouseId = this.props.match.params.id;
    const ConvertlightHouseIdToNumber = parseInt(lightHouseId, 10);
    smashRequests.getAllPropertiesWithOwnerInfo()
      .then((properties) => {
        const lightHouses = properties.filter(property => property.type === 0);
        const lightHouse = lightHouses.find(property => property.id === ConvertlightHouseIdToNumber);
        this.setState({ lightHouse });
      }).then(() => {
        this.checkExistingProperty();
      }).catch(err => console.error(err));
  }

  backButton = () => {
    this.props.history.push('/properties/lightHouses');
  }

  rentProperty = (e) => {
    const propertyId = e.target.id;
    this.props.history.push(`/rental/${propertyId}`);
  }

  // clicking onheart icon changes isLiked state
  changeIsLikedState = () => {
    const { isLiked } = this.state;
    this.setState({ isLiked: !isLiked });
  }

  // check property exist in the state to hold the state of isLiked property
  checkExistingProperty = () => {
    const { lightHouse, isLiked } = this.state;
    const { currentUser } = this.props;
    likedPropertyRequests.getAllLikedPropertiesWithUser()
      .then((likedProperties) => {
        const currentLikedProperty = likedProperties.filter(x => x.propertyId === lightHouse.id && x.userId === currentUser.id);
        if (currentLikedProperty.length === 1) {
          this.setState({ isLiked: !isLiked });
          this.setState({ currentLikedProperty });
        } else {
          this.setState({ isLiked });
        }
      });
  }

  OwnerPropertiesView = (e) => {
    const ownerId = e.target.dataset.owner;
    this.props.history.push(`/ownerProperties/${ownerId}`);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { propertyId } = e.target.dataset;
    this.props.history.push(`/editProperty/${propertyId}`);
  }

  deleteProperty = (e) => {
    const { propertyId } = e.target.dataset;
    propertiesRequests.deleteProperty(propertyId)
      .then(() => {
        this.props.history.push('/properties/lighthouses');
      });
  }

  render() {
    const { lightHouse, isLiked } = this.state;
    const { currentUser } = this.props;
    const makeLikedPropertyButton = () => {
      if (lightHouse.isOwner === false) {
        return (
          <LikeButton
          isLiked={isLiked}
          changeIsLikedState= {this.changeIsLikedState}
          lightHouse = {lightHouse}
          userId = {currentUser.id}
          propertyId = {lightHouse.id}
          />
        );
      } return (<span></span>);
    };

    const makebutton = () => {
      if (currentUser.isOwner === true) {
        return (
          <div className = "float-right">
            <i onClick= {this.editEvent} data-property-id={lightHouse.id} className="far fa-edit edit-icon fa-2x mr-3" title="Edit"/>
            <i className="fas fa-ban fa-2x mr-3" title="Deactivate"></i>
            <i onClick = {this.deleteProperty} className="fas fa-trash fa-2x" data-property-id={lightHouse.id} title="Delete"></i>
          </div>
        );
      } return (<span></span>);
    };

    return (
      <div>
        <div className="back-button">
              <button className = "btn btn-warning" onClick = {this.backButton}>Back</button>
        </div>
        <div className="card mx-auto bg-light detail">
          <div className="imgHolder">
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse"/>
          </div>
          <div className="card-body">
            <h5>{lightHouse.propertyName}</h5>
            <p>{lightHouse.street}</p>
            <p>{lightHouse.city}, {lightHouse.state} - {lightHouse.zipCode}</p>
            <p>{lightHouse.description}</p>
            <p>${lightHouse.price}/per night</p>
            <p className="owner-name" onClick = {this.OwnerPropertiesView} data-owner={lightHouse.ownerId}>Owned By: {lightHouse.name}</p>
            <button id={lightHouse.id} className="bttn-pill bttn-md bttn-primary mr-2" onClick={this.rentProperty}>Rent Me!!!</button>
            {makebutton()}
            {makeLikedPropertyButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default LightHouseDetail;
