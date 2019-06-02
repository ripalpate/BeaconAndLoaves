import React from 'react';
import smashRequests from '../../../helpers/data/smashRequests';
import './SiloNuclearDetail.scss';
class SiloNuclearDetail extends React.Component {
  state = {
    siloNuclear: []
  }

  componentDidMount() {
    const siloNuclearId = this.props.match.params.id;
    smashRequests.getAllPropertiesWithOwnerInfo()
    .then((properties) => {
      const siloNuclears = properties.filter(property => property.type === 1);
      const siloNuclear= siloNuclears.find(property => property.id == siloNuclearId);
      this.setState( {siloNuclear});
    }).catch(err => console.error(err));
  }

  backButton = () => {
    this.props.history.push('/properties/siloNuclears');
  }

  render() {
    const{siloNuclear}= this.state;
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
            <p>Owned By: {siloNuclear.name}</p>
            <button className="btn btn-primary mr-2">Rent</button>
            <button className="btn btn-success"id="likedProperties">Liked Property</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SiloNuclearDetail;