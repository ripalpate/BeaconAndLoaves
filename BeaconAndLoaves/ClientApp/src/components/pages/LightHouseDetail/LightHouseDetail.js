import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import './LightHouseDetail.scss';
class LightHouseDetail extends React.Component {
  state = {
    lightHouse: []
  }

  componentDidMount() {
    const lightHouseId = this.props.match.params.id;
    propertiesRequests.getProperties()
      .then((properties) => {
        const lightHouses = properties.filter(property => property.type === 0);
        const lightHouse= lightHouses.find(property => property.id == lightHouseId);
        this.setState( {lightHouse});
      }).catch(err => console.error(err));
  }
  render() {
    const{lightHouse}= this.state;
    return (
      <div className="card ml-4 bg-light detail">
          <div className="imgHolder">
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse"/>
          </div>
          <div className="card-body">
            <h5>{lightHouse.propertyName}</h5>
            <p>{lightHouse.street}</p>
            <p>{lightHouse.city}, {lightHouse.state} - {lightHouse.zipCode}</p>
            <p>{lightHouse.description}</p>
            <p>${lightHouse.price}/per night</p>
          </div>
        </div>
    );
  }
}

export default LightHouseDetail;