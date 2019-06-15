import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import LikeButton from '../LikeButton/LikeButton';
import './SiloNuclearDetail.scss';

class SiloNuclearDetail extends React.Component {
  state = {
    currentLikedProperty: [],
    siloNuclear: [],
    isLiked: false,
  }

  componentDidMount() {
    this.getPropertyWithOwnerName();
  }

  getPropertyWithOwnerName = () => {
    const siloNuclearId = this.props.match.params.id;
    const ConvertSiloNuclearIdToNumber = parseInt(siloNuclearId, 10);
    smashRequests.getAllPropertiesWithOwnerInfo()
      .then((properties) => {
        const siloNuclears = properties.filter(property => property.type === 1);
        const siloNuclear = siloNuclears.find(property => property.id === ConvertSiloNuclearIdToNumber);
        this.setState({ siloNuclear });
      }).then(() => {
        this.checkExistingProperty();
      }).catch(err => console.error(err));
  }

  checkExistingProperty = () => {
    const { siloNuclear, isLiked } = this.state;
    likedPropertyRequests.getAllLikedProperties()
      .then((likedProperties) => {
        const currentLikedProperty = likedProperties.filter(x => x.propertyId === siloNuclear.id && x.userId === siloNuclear.ownerId);
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

  OwnerPropertiesView = (e) => {
    const ownerId = e.target.dataset.owner;
    this.props.history.push(`/ownerProperties/${ownerId}`);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { propertyId } = e.target.dataset;
    this.props.history.push(`/editProperty/${propertyId}`);
  }


  render() {
    const { siloNuclear, isLiked } = this.state;
    const makeLikedPropertyButton = () => {
      if (siloNuclear.isOwner === false) {
        return (
          <LikeButton
          isLiked={isLiked}
          changeIsLikedState= {this.changeIsLikedState}
          siloNuclear = {siloNuclear}
          userId = {siloNuclear.ownerId}
          propertyId = {siloNuclear.id}
          />
        );
      }
      return (<span></span>);
    };

    const makebutton = () => {
      if (siloNuclear.isOwner === true) {
        return (
          <div className = "float-right">
            <i onClick= {this.editEvent} data-property-id={siloNuclear.id} className="far fa-edit edit-icon fa-2x mr-2" title="Edit"/>
            <i className="fas fa-ban fa-2x mr-2" title="Deactivate"></i>
            <i className="fas fa-trash fa-2x" title="Delete"></i>
        </div>
        );
      }   return (<span></span>);
    };

    return (
      <div>
        <div className="back-button">
          <button className = "btn btn-warning" onClick = {this.backButton}>Back</button>
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
            <button className="btn btn-primary mr-2">Rent</button>
            {makebutton()}
            {makeLikedPropertyButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default SiloNuclearDetail;
