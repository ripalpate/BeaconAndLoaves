import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import './SiloNuclearDetail.scss';

class SiloNuclearDetail extends React.Component {
  state = {
    currentLikedProperty:[],
    siloNuclear: [],
    isLiked: false
  }

  getPropertyWithOwnerName = () => {
    const siloNuclearId = this.props.match.params.id;
    smashRequests.getAllPropertiesWithOwnerInfo()
    .then((properties) => {
      const siloNuclears = properties.filter(property => property.type === 1);
      const siloNuclear= siloNuclears.find(property => property.id == siloNuclearId);
      this.setState( {siloNuclear});
    }).then(() => {
      this.checkExistingProperty();
    }).catch(err => console.error(err));
  }

  changeIsLikedState = (e) => {
    e.preventDefault();
    const{ isLiked} = this.state;
    this.setState({ isLiked: !isLiked });
    this.addLikedProperties();
  }

  addLikedProperties = () => {
    const{ siloNuclear, isLiked} = this.state;
    const myLikedProperty = {
      "userId" : siloNuclear.ownerId,
      "propertyId" : siloNuclear.id
    };
    if(!isLiked){
    likedPropertyRequests.createLikedProperty(myLikedProperty)
      .then((myLikedProperty)=>{
        this.setState({ currentLikedProperty: myLikedProperty.data});
        this.setState({isLiked: true});
      });
    }else {
      this.deleteLikedProperties();
    }
  }

  deleteLikedProperties = () => {
    const{currentLikedProperty} = this.state;
     const likedPropertyId = currentLikedProperty[0].id;
     likedPropertyRequests.deleteLikedProperty(likedPropertyId)
     .then(()=>{
       this.setState({isLiked: false});
     })
  }

  checkExistingProperty = () => {
    const {siloNuclear, isLiked} = this.state;
    likedPropertyRequests.getAllLikedProperties()
    .then((likedProperties) => {
      const currentLikedProperty = likedProperties.filter(x => x.propertyId === siloNuclear.id && x.userId === siloNuclear.ownerId);
      if(currentLikedProperty.length === 1){
        this.setState({isLiked: !isLiked});
        this.setState({currentLikedProperty});
      } else {
        this.setState({isLiked: isLiked});
      }
    });
  }

  componentDidMount() {
    this.getPropertyWithOwnerName();
  }

  backButton = () => {
    this.props.history.push('/properties/siloNuclears');
  }
  
  OwnerProductView = () => {
    this.props.history.push(`/ownerProducts`);
  }

  render() {
    const{siloNuclear,isLiked}= this.state;
    const makeLikedPropertyButton = () => {
      if(siloNuclear.isOwner === false && isLiked === false){
        return(
          <button className="btn" onClick={this.changeIsLikedState}><i id="!isLiked" className="far fa-heart fa-2x"/></button>
        );
     } else if(siloNuclear.isOwner === false && isLiked === true){
        return(
          <button className="btn" onClick={this.changeIsLikedState}><i id="isLiked" className="far fa-heart fa-2x"/></button>
        );
     }    
    }
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
            <p className="owner-name" onClick = {this.OwnerProductView}>Owned By: {siloNuclear.name}</p>
            <button className="btn btn-primary mr-2">Rent</button>
            {makeLikedPropertyButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default SiloNuclearDetail;