import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class SiloNuclearDetail extends React.Component {
  state = {
    siloNuclear: []
  }

  componentDidMount() {
    const siloNuclearId = this.props.match.params.id;
    propertiesRequests.getProperties()
      .then((properties) => {
        const siloNuclears = properties.filter(property => property.type === 1);
        const siloNuclear= siloNuclears.find(property => property.id == siloNuclearId);
        this.setState( {siloNuclear});
      }).catch(err => console.error(err));
  }
  render() {
    const{siloNuclear}= this.state;
    return (
      <div className="card ml-4 bg-light detail">
          <div className="imgHolder">
            <img className="singleLightHouseImg" src={siloNuclear.imageUrl} alt="siloNuclear"/>
          </div>
          <div className="card-body">
            <h5>{siloNuclear.propertyName}</h5>
            <p>{siloNuclear.street}</p>
            <p>{siloNuclear.city}, {siloNuclear.state} - {siloNuclear.zipCode}</p>
            <p>{siloNuclear.description}</p>
            <p>${siloNuclear.price}/per night</p>
          </div>
        </div>
    );
  }
}

export default SiloNuclearDetail;