import React from 'react';
import PropTypes from 'prop-types';
import smashRequests from '../../../helpers/data/smashRequests';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import rentalRequests from '../../../helpers/data/rentalRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import WarningModal from '../../WarningModal/WarningModal';
import LikeButton from '../../LikeButton/LikeButton';
import Rental from '../../Rental/Rental';
import AddEditProperty from '../../AddEditProperty/AddEditProperty';

import './LightHouseDetail.scss';

class LightHouseDetail extends React.Component {
  lightHouseDetailMounted = false;

  state = {
    currentLikedProperty: [],
    lightHouse: {},
    isLiked: false,
    isDeletingProperty: false,
    modal: false,
    lightHouseId: 0,
    rentalModal: false,
    addEditingModal: false,
    isEditing: false,
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.lightHouseDetailMounted = !!currentUser.id;
    if (this.lightHouseDetailMounted) {
      this.getPropertyWithOwnerName();
    }
  }

toggleModal = () => {
  const { modal } = this.state;
  this.setState({ modal: !modal });
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

  backToProperties = () => {
    this.props.history.push('/properties');
  }

  backToLikedProperties = () => {
    this.props.history.push('/likedProperties');
  }

  toggleRentalModal = () => {
    const { rentalModal } = this.state;
    this.setState({ rentalModal: !rentalModal });
  }

  togglePropertyModal = () => {
    const { addEditingModal, isEditing } = this.state;
    if (isEditing) {
      this.setState({ addEditingModal: !addEditingModal, isEditing: false });
      this.getPropertyWithOwnerName();
    }
    this.setState({ addEditingModal: !addEditingModal, isEditing: true });
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

  deleteProperty = (propertyId) => {
    propertiesRequests.deleteProperty(propertyId)
      .then(() => {
        this.props.history.push('/properties/lighthouses');
      });
  }

  checkFutureRentalsForProperty = (e) => {
    const { propertyId } = e.target.dataset;
    rentalRequests.getAllRentalsByPropertyId(propertyId)
      .then((futureRentals) => {
        if (futureRentals.length === 0) {
          this.deleteProperty(propertyId);
        } else {
          this.setState({ isDeletingProperty: true }, this.toggleModal());
        }
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
      addEditingModal,
      isEditing,
      isDeletingProperty,
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
            <button className="bttn-pill mr-3"onClick= {this.togglePropertyModal} data-property-id={lightHouse.id}><i onClick= {this.togglePropertyModal} data-property-id={lightHouse.id} className="far fa-edit edit-icon" title="Edit"/></button>
            <button className="bttn-pill"onClick = {this.checkFutureRentalsForProperty} data-property-id={lightHouse.id}>
              <i onClick = {this.checkFutureRentalsForProperty} className="fas fa-trash delete-btn" data-property-id={lightHouse.id} title="Delete"></i>
            </button>
          </div>
        );
      } return (<span></span>);
    };

    const activateButton = () => {
      if (lightHouse.ownerId === currentUser.id) {
        if (lightHouse.isActive === true) {
          return (
        <div className = "float-right mr-3">
          <i className="fas fa-2x fa-toggle-on deactivate-icon" data-property-id={lightHouse.id} title="Dectivate Property" onClick = {this.deactivateProperty}></i>
        </div>
          );
        } return (
        <div className = "float-right mr-3">
          <i className="fas fa-2x fa-toggle-off activate-icon" data-property-id={lightHouse.id} title="Activate Property" onClick = {this.activateProperty}></i>
        </div>
        );
      } return (<span></span>);
    };

    return (
      <div className = "">
        <div className="back-button animated slideInDown">
              <button className = "bttn-pill bttn-md" onClick = {this.backButton} title="To All Lighthouses"><i className="far fa-arrow-alt-circle-left"></i></button>
              <button className = "bttn-pill bttn-md mt-3 ml-2 allProperties" onClick = {this.backToProperties} title="To All Properties"><i className="fas fa-building"></i></button>
              <button className = "bttn-pill bttn-md mt-3 ml-2 likePropertyButton" onClick = {this.backToLikedProperties} title="To Liked Properties"><i className="fas fa-heart"></i></button>
        </div>
        <div className="card mx-auto detail animated zoomIn" id="details">
          <div className="imgHolder">
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse"/>
          </div>
          <div className="card-body desc">
            <h5 className="propertyTitle">{lightHouse.propertyName}</h5>
            <p>{lightHouse.street}</p>
            <p>{lightHouse.city}, {lightHouse.state} - {lightHouse.zipCode}</p>
            <p>{lightHouse.description}</p>
            <p>${lightHouse.price}/per night</p>
            <p className="" onClick = {this.OwnerPropertiesView} data-owner={lightHouse.ownerId}>Owner: 
              <span className= "owner-name" data-owner={lightHouse.ownerId} onClick = {this.OwnerPropertiesView}> {lightHouse.name}
              </span>
            </p>
            <button id={lightHouse.id} className="bttn-pill bttn-md rentButton mr-2" onClick={this.toggleRentalModal}>Rent Me!!!</button>
            {makebutton()}
            {makeLikedPropertyButton()}
            {activateButton()}
          </div>
        </div>
        <WarningModal
        isDeletingProperty = {isDeletingProperty}
        toggleModal = {this.toggleModal}
        modal = {modal}
        />
        <Rental
          currentUser={currentUser}
          rentalModal={rentalModal}
          property={lightHouse}
          propertyId = {this.props.match.params.id * 1}
          toggleRentalModal={this.toggleRentalModal}
          routeToHome={this.routeToHome}
        />
        <AddEditProperty
          addEditingModal={addEditingModal}
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
