import React from 'react';
import './LightHouseDetail.scss';
import smashRequests from '../../../helpers/data/smashRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import LikedProperties from '../LikedProperties/LikedProperties';

class LightHouseDetail extends React.Component {
  state = {
    lightHouse: [],
    isLiked: false
  }

  getPropertyWithOwnerName = () => {
    const lightHouseId = this.props.match.params.id;
    smashRequests.getAllPropertiesWithOwnerInfo()
    .then((properties) => {
      const lightHouses = properties.filter(property => property.type === 0);
      const lightHouse= lightHouses.find(property => property.id == lightHouseId);
      this.setState( {lightHouse});
    }).then(() => {
      this.checkExistingProperty();
    }).catch(err => console.error(err));
  }

  backButton = () => {
    this.props.history.push('/properties/lightHouses');
  }

  addLikedProperty = (e) => {
    const {lightHouse, isLiked} = this.state;
    e.preventDefault();
    const myLikedProperty = {
      "userId" : lightHouse.ownerId,
      "propertyId" : lightHouse.id
    };
    likedPropertyRequests.createLikedProperty(myLikedProperty)
    .then(()=>{
      this.setState({isLiked: !isLiked});
    });
    // if(isLiked){
    //   likedPropertyRequests.deleteLikedProperty(myLikedProperty.)
    // }
  }

  checkExistingProperty = () => {
    const {lightHouse, isLiked} = this.state;
    likedPropertyRequests.getAllLikedProperties()
    .then((likedProperties) => {
      const currentProperty = likedProperties.filter(x => x.propertyId === lightHouse.id && x.userId === lightHouse.ownerId);
      if(currentProperty.length === 1){
        this.setState({isLiked: !isLiked});
      } else {
        this.setState({isLiked: isLiked});
      }
    });
  }
  componentDidMount() {
      this.getPropertyWithOwnerName();
  }
  render() {
    const{lightHouse, isLiked}= this.state;
    const makeLikedPropertyButton = () => {
      if(lightHouse.isOwner === false && isLiked === false){
        return(
          <button className="btn" onClick={this.addLikedProperty}><i id="!isLiked" className="far fa-heart fa-2x"/></button>
        );
     } else if(lightHouse.isOwner === false && isLiked === true){
        return(
          <button className="btn" onClick={this.addLikedProperty}><i id="isLiked" className="far fa-heart fa-2x"/></button>
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
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse"/>
          </div>
          <div className="card-body">
            <h5>{lightHouse.propertyName}</h5>
            <p>{lightHouse.street}</p>
            <p>{lightHouse.city}, {lightHouse.state} - {lightHouse.zipCode}</p>
            <p>{lightHouse.description}</p>
            <p>${lightHouse.price}/per night</p>
            <p>Owned By: {lightHouse.name}</p>
            <button className="btn btn-primary mr-2">Rent</button>
            {makeLikedPropertyButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default LightHouseDetail;