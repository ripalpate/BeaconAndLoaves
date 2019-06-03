import React from 'react';
import './LightHouseDetail.scss';
import smashRequests from '../../../helpers/data/smashRequests';

class LightHouseDetail extends React.Component {
  state = {
    lightHouse: []
  }

  getPropertyWithOwnerName = () => {
    const lightHouseId = this.props.match.params.id;
    smashRequests.getAllPropertiesWithOwnerInfo()
    .then((properties) => {
      const lightHouses = properties.filter(property => property.type === 0);
      const lightHouse= lightHouses.find(property => property.id == lightHouseId);
      this.setState( {lightHouse});
    }).catch(err => console.error(err));
  }

  // likedPropertyView = (e) => {
  //   const view = e.currentTarget.id;
  //   this.props.history.push(`/${view}`);
  // }

  backButton = () => {
    this.props.history.push('/properties/lightHouses');
  }

  componentDidMount() {
      this.getPropertyWithOwnerName();
  }
  render() {
    const{lightHouse}= this.state;
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
            <button className="btn btn-success" id="likedProperties">Liked Property</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LightHouseDetail;