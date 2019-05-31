import React from 'react';
import SingleLightHouse from '../SingleLightHouse/SingleLightHouse';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class LightHouses extends React.Component {
  state = {
    lightHouses: []
  }

  componentDidMount()
  {
    propertiesRequests.getProperties()
      .then((properties) => {
        const lightHouses = properties.filter(property => property.type === 0);
        this.setState({ lightHouses });
      }).catch(err => console.error(err));
  }
  render() {
     const {  lightHouses } = this.state;
    const singleLightHouseComponent = lightHouses.map(lightHouse => (
      <SingleLightHouse
      lightHouse={lightHouse}
      Key = {lightHouse.id}
      />
    ));
    return (
        <div className="lightHouses mx-auto mt-5">
          <h3 className = "lightHouseContainer d-flex mt-5">{singleLightHouseComponent}</h3>
        </div>
    );
  // }
}
}
export default LightHouses;