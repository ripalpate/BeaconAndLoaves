import React from 'react';
import PropTypes from 'prop-types';
import smashRequests from '../../../helpers/data/smashRequests';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import LikeButton from '../LikeButton/LikeButton';
import Rental from '../Rental/Rental';
import AddEditProperty from '../../AddEditProperty/AddEditProperty';

import './LightHouseDetail.scss';

class LightHouseDetail extends React.Component {
  lightHouseDetailMounted = false;

  state = {
    currentLikedProperty: [],
    lightHouse: {},
    isLiked: false,
    lightHouseId: 0,
    rentalModal: false,
    modal: false,
    isEditing: false,
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


  // get Propertydetails with owner name and hold isLiked state
  getPropertyWithOwnerName = () => {
    const lightHouseId = this.props.match.params.id;
    this.setState({ lightHouseId });
    const convertlightHouseIdToNumber = parseInt(lightHouseId, 10);
    smashRequests.getSinglePropertyWithOwnerInfo(convertlightHouseIdToNumber)
      .then((lightHouse) => {
        this.setState({ lightHouse });
      }).then(() => {
        this.checkExistingProperty();
      }).catch(err => console.error(err));
  }

  backButton = () => {
    this.props.history.push('/properties/lightHouses');
  }

  toggleRentalModal = () => {
    const { rentalModal } = this.state;
    this.setState({ rentalModal: !rentalModal });
  }

  togglePropertyModal = () => {
    const { modal, isEditing } = this.state;
    if (isEditing) {
      this.setState({ modal: !modal, isEditing: false });
      this.getPropertyWithOwnerName();
    }
    this.setState({ modal: !modal, isEditing: true });
  }

  routeToHome = () => {
    this.props.history.push('/rentingHistory');
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

  deactivateProperty = (e) => {
    const { propertyId } = e.target.dataset;
    const updateProp = { ...this.state.lightHouse };
    updateProp.isActive = 0;
    propertiesRequests.updateProperty(propertyId, updateProp)
      .then(() => {
        if (updateProp.type === 0) {
          this.props.history.push('/properties/lighthouses');
        }
      });
  }

  activateProperty = (e) => {
    const { propertyId } = e.target.dataset;
    const updateProperty = { ...this.state.lightHouse };
    updateProperty.isActive = 1;
    propertiesRequests.updateProperty(propertyId, updateProperty)
      .then(() => {
        this.props.history.push('/properties/lighthouses');
      });
  }

  render() {
    const {
      lightHouse,
      isLiked,
      rentalModal,
      modal,
      isEditing,
    } = this.state;

    const { currentUser } = this.props;

    const makeLikedPropertyButton = () => {
      if (lightHouse.ownerId !== currentUser.id) {
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
      if (currentUser.isOwner === true && lightHouse.ownerId === currentUser.id) {
        return (
          <div className = "float-right">
            <i onClick= {this.togglePropertyModal} data-property-id={lightHouse.id} className="far fa-edit edit-icon fa-2x mr-3" title="Edit"/>
            <i onClick = {this.deleteProperty} className="fas fa-trash fa-2x" data-property-id={lightHouse.id} title="Delete"></i>
          </div>
        );
      } return (<span></span>);
    };

    const activateButton = () => {
      if (lightHouse.ownerId === currentUser.id) {
        if (lightHouse.isActive === true) {
          return (
        <div className = "float-right mr-3">
          <i className="fas fa-toggle-on fa-2x deactivate-icon" data-property-id={lightHouse.id} title="Dectivate Property" onClick = {this.deactivateProperty}></i>
        </div>
          );
        } return (
        <div className = "float-right mr-3">
          <i className="fas fa-toggle-off fa-2x activate-icon" data-property-id={lightHouse.id} title="Activate Property" onClick = {this.activateProperty}></i>
      </div>
        );
      } return (<span></span>);
    };

    return (
      <div>
        <div className="back-button">
              <button className = "bttn-pill bttn-md bttn-warning" onClick = {this.backButton}>Back</button>
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
            <button id={lightHouse.id} className="bttn-pill bttn-md bttn-primary mr-2" onClick={this.toggleRentalModal}>Rent Me!!!</button>
            {makebutton()}
            {makeLikedPropertyButton()}
            {activateButton()}
          </div>
        </div>
        <Rental
          currentUser={currentUser}
          rentalModal={rentalModal}
          property={lightHouse}
          propertyId = {this.props.match.params.id * 1}
          toggleRentalModal={this.toggleRentalModal}
          routeToHome={this.routeToHome}
        />
        <AddEditProperty
          modal={modal}
          isEditing={isEditing}
          togglePropertyModal={this.togglePropertyModal}
          changeAddEditView={this.changeAddEditView}
          selectedProperty={lightHouse}
        />
      </div>
    );
  }
}

export default LightHouseDetail;
