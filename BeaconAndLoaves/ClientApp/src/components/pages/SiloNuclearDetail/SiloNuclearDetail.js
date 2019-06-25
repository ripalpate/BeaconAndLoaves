import React from 'react';
import PropTypes from 'prop-types';
import smashRequests from '../../../helpers/data/smashRequests';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import LikeButton from '../LikeButton/LikeButton';
import Rental from '../Rental/Rental';

import './SiloNuclearDetail.scss';

class SiloNuclearDetail extends React.Component {
  state = {
    currentLikedProperty: [],
    siloNuclear: {},
    isLiked: false,
    siloNuclearId: 0,
    rentalModal: false,
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  componentDidMount() {
    this.getPropertyWithOwnerName();
  }

  getPropertyWithOwnerName = () => {
    const siloNuclearId = this.props.match.params.id;
    this.setState({ siloNuclearId });
    const convertSiloNuclearIdToNumber = parseInt(siloNuclearId, 10);
    smashRequests.getSinglePropertyWithOwnerInfo(convertSiloNuclearIdToNumber)
      .then((siloNuclear) => {
        this.setState({ siloNuclear });
      }).then(() => {
        this.checkExistingProperty();
      }).catch(err => console.error(err));
  }

  checkExistingProperty = () => {
    const { siloNuclear, isLiked } = this.state;
    const { currentUser } = this.props;
    likedPropertyRequests.getAllLikedPropertiesWithUser()
      .then((likedProperties) => {
        const currentLikedProperty = likedProperties.filter(x => x.propertyId === siloNuclear.id && x.userId === currentUser.id);
        if (currentLikedProperty.length === 1) {
          this.setState({ isLiked: !isLiked });
          this.setState({ currentLikedProperty });
        } else {
          this.setState({ isLiked });
        }
      });
  }

  changeIsLikedState = () => {
    const { isLiked } = this.state;
    this.setState({ isLiked: !isLiked });
  }

  backButton = () => {
    this.props.history.push('/properties/siloNuclears');
  }

  toggleRentalModal = () => {
    const { rentalModal } = this.state;
    this.setState({ rentalModal: !rentalModal });
  }

  routeToHome = () => {
    this.props.history.push('/rentingHistory');
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
        this.props.history.push('/properties/siloNuclears');
      });
  }

  
  deactivateProperty = (e) => {
    const { propertyId } = e.target.dataset;
    const updateProp = { ...this.state.siloNuclear };
    updateProp.isActive = 0;
    propertiesRequests.updateProperty(propertyId, updateProp)
      .then(() => {
        if (updateProp.type === 1) {
          this.props.history.push('/properties/siloNuclears');
        }
      });
  }

  activateProperty = (e) => {
    const { propertyId } = e.target.dataset;
    const updateProperty = { ...this.state.siloNuclear };
    updateProperty.isActive = 1;
    propertiesRequests.updateProperty(propertyId, updateProperty)
      .then(() => {
        this.props.history.push('/properties/siloNuclears');
      });
  }

  render() {
    const { siloNuclear, isLiked, rentalModal } = this.state;
    const { currentUser } = this.props;
    const makeLikedPropertyButton = () => {
      if (siloNuclear.ownerId !== currentUser.id) {
        return (
          <LikeButton
          isLiked={isLiked}
          changeIsLikedState= {this.changeIsLikedState}
          siloNuclear = {siloNuclear}
          userId = {currentUser.id}
          propertyId = {siloNuclear.id}
          />
        );
      }
      return (<span></span>);
    };

    const makebutton = () => {
      if (currentUser.isOwner === true && siloNuclear.ownerId === currentUser.id) {
        return (
          <div className = "float-right">
            <i onClick= {this.editEvent} data-property-id={siloNuclear.id} className="far fa-edit edit-icon fa-2x mr-3" title="Edit"/>
            <i onClick = {this.deleteProperty} className="fas fa-trash fa-2x" data-property-id={siloNuclear.id} title="Delete"></i>
          </div>
        );
      } return (<span></span>);
    };

    const activateButton = () => {
      if (siloNuclear.ownerId === currentUser.id) {
        if (siloNuclear.isActive === true) {
          return (
        <div className = "float-right mr-3">
          <i className="fas fa-toggle-on fa-2x" data-property-id={siloNuclear.id} title="Dectivate Property" onClick = {this.deactivateProperty}></i>
        </div>
          );
        } return (
        <div className = "float-right mr-3">
          <i className="fas fa-toggle-off fa-2x" data-property-id={siloNuclear.id} title="Activate Property" onClick = {this.activateProperty}></i>
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
            <img className="singleLightHouseImg" src={siloNuclear.imageUrl} alt="siloNuclear"/>
          </div>
          <div className="card-body">
            <h5>{siloNuclear.propertyName}</h5>
            <p>{siloNuclear.street}</p>
            <p>{siloNuclear.city}, {siloNuclear.state} - {siloNuclear.zipCode}</p>
            <p>{siloNuclear.description}</p>
            <p>${siloNuclear.price}/per night</p>
            <p className="owner-name" onClick = {this.OwnerPropertiesView} data-owner={siloNuclear.ownerId}>Owned By: {siloNuclear.name}</p>
            <button id={siloNuclear.id} className="bttn-pill bttn-md bttn-primary mr-2" onClick={this.toggleRentalModal}>Rent Me!!!</button>
            {makebutton()}
            {makeLikedPropertyButton()}
            {activateButton()}
          </div>
        </div>
        <Rental
          currentUser={currentUser}
          rentalModal={rentalModal}
          property={siloNuclear}
          propertyId = {this.props.match.params.id * 1}
          toggleRentalModal={this.toggleRentalModal}
          routeToHome={this.routeToHome}
        />
      </div>
    );
  }
}

export default SiloNuclearDetail;
