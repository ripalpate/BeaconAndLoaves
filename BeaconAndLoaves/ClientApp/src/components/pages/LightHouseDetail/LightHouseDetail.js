import React from 'react';
import './LightHouseDetail.scss';
import smashRequests from '../../../helpers/data/smashRequests';
import userRequests from '../../../helpers/data/userRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import OwnerPropducts from '../OwnerProducts/OwnerProducts';

class LightHouseDetail extends React.Component {
  state = {
    currentLikedProperty:[],
    lightHouse: [],
    isLiked: false,
    properties: []
  }

  //get Propertydetails with owner name and hold isLiked state
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

  //clicking onheart icon changes isLiked state
  changeIsLikedState = (e) => {
    e.preventDefault();
    const{ isLiked} = this.state;
    this.setState({ isLiked: !isLiked });
    this.addLikedProperties();
  }

  //adding property to liked property
  addLikedProperties = () => {
    const{ lightHouse, isLiked} = this.state;
    const myLikedProperty = {
      "userId" : lightHouse.ownerId,
      "propertyId" : lightHouse.id
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

  // deleting property from liked property upon clicking heart icon again
  deleteLikedProperties = () => {
    const{currentLikedProperty} = this.state;
     const likedPropertyId = currentLikedProperty[0].id;
     likedPropertyRequests.deleteLikedProperty(likedPropertyId)
     .then(()=>{
       this.setState({isLiked: false});
     })
  }

  //check property exist in the state to hold the state of isLiked property
  checkExistingProperty = () => {
    const {lightHouse, isLiked} = this.state;
    likedPropertyRequests.getAllLikedProperties()
    .then((likedProperties) => {
      const currentLikedProperty = likedProperties.filter(x => x.propertyId === lightHouse.id && x.userId === lightHouse.ownerId);
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

  OwnerProductView = (e) => {
    const getOwnerId = e.target.dataset.owner;
    userRequests.getUserProperties(getOwnerId)
    .then((properties)=> {
      this.setState({properties});
      console.log(properties);
      this.props.history.push('/ownerProducts');
    })
  }

  render() {
    const{lightHouse, isLiked, properties}= this.state;

    const singleOwnerPropertyComponent = properties.map(property => (
      <OwnerPropducts
      property={property}
      key = {property.id}
      />
    ));

    const makeLikedPropertyButton = () => {
      if(lightHouse.isOwner === false && isLiked === false){
        return(
          <button className="btn" onClick={this.changeIsLikedState}><i id="!isLiked" className="far fa-heart fa-2x"/></button>
        );
     } else if(lightHouse.isOwner === false && isLiked === true){
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
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse"/>
          </div>
          <div className="card-body">
            <h5>{lightHouse.propertyName}</h5>
            <p>{lightHouse.street}</p>
            <p>{lightHouse.city}, {lightHouse.state} - {lightHouse.zipCode}</p>
            <p>{lightHouse.description}</p>
            <p>${lightHouse.price}/per night</p>
            <p className="owner-name" onClick = {this.OwnerProductView} data-owner={lightHouse.ownerId}>Owned By: {lightHouse.name}</p>
            <button className="btn btn-primary mr-2">Rent</button>
            {makeLikedPropertyButton()}
          </div>
          <div>{singleOwnerPropertyComponent}</div>
        </div>
      </div>
    );
  }
}

export default LightHouseDetail;