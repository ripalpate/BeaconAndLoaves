import React from 'react';
import './LightHouseDetail.scss';
import smashRequests from '../../../helpers/data/smashRequests';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import LikedProperties from '../LikedProperties/LikedProperties';

class LightHouseDetail extends React.Component {
  state = {
    currentLikedProperty:[],
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

  changeIsLikedState = (e) => {
    e.preventDefault();
    const{ isLiked} = this.state;
    this.setState({ isLiked: !isLiked });
    this.addAndDeleteLikedProperties();
  }

  addAndDeleteLikedProperties = () => {
    const{ lightHouse, isLiked} = this.state;
    const myLikedProperty = {
      "userId" : lightHouse.ownerId,
      "propertyId" : lightHouse.id
    };
    if(!isLiked){
    likedPropertyRequests.createLikedProperty(myLikedProperty)
      .then((myLikedProperty)=>{
        //console.log(myLikedProperty);
        this.setState({ currentLikedProperty: myLikedProperty.data});
        this.setState({isLiked: true});
      });
    }else {
      const{currentLikedProperty} = this.state;
     // console.log(currentLikedProperty);
      const likedPropertyId = currentLikedProperty[0].id;
     // console.log(likedPropertyId);
      likedPropertyRequests.deleteLikedProperty(likedPropertyId)
      .then(()=>{
        this.setState({isLiked: false});
      })
    }
  }

  // deleteLikedProperties = () => {

  // }
  // addLikedProperty = (e) => {
  //   const {lightHouse, isLiked} = this.state;
  //   e.preventDefault();
  //   const myLikedProperty = {
  //     "userId" : lightHouse.ownerId,
  //     "propertyId" : lightHouse.id
  //   };
  //   if(!isLiked){
  //   likedPropertyRequests.createLikedProperty(myLikedProperty)
  //   .then(()=>{
  //     this.setState({isLiked: !isLiked});
  //   });
  //   }else{
  //     likedPropertyRequests.deleteLikedProperty(lightHouse.id)
  //     .then(()=>{
  //       this.setState({isLiked: isLiked});
  //     })
  //   }
    // if(isLiked){
    //   likedPropertyRequests.deleteLikedProperty(myLikedProperty.id)
    //   .then(()=> {
    //    // this.setState({isLiked: isLiked});
    //   })
    //}
  //}

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

  render() {
    const{lightHouse, isLiked}= this.state;
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