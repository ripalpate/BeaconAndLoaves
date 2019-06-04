import React from 'react';
import SingleLightHouse from '../SingleLightHouse/SingleLightHouse';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class LightHouses extends React.Component {
  state = {
    lightHouses: [],
    newestLightHouse:[]
  }

  componentDidMount()
  {
    propertiesRequests.getProperties()
      .then((properties) => {
        const lightHouses = properties.filter(property => property.type === 0);
        //const newestLightHouse = lightHouses.sort((x, y) => (x.propertyName) - (y.propertyName));
        const newestLightHouse = lightHouses.sort((x, y) => ('' + y.createdOn).localeCompare(x.createdOn));
        console.log(newestLightHouse);
        this.setState({ lightHouses });
      }).catch(err => console.error(err));
  }
  lightHouseDetailView = (lightHouseId) => {
    this.props.history.push(`/lightHouses/${lightHouseId}`);
  }

  // handleChange =() => {
  //   this.setState({lightHouses:newestLightHouse});
  // }
  render() {
     const {  lightHouses } = this.state;
    const singleLightHouseComponent = lightHouses.map(lightHouse => (
      <SingleLightHouse
      lightHouse={lightHouse}
      key = {lightHouse.id}
      lightHouseDetailView = {this.lightHouseDetailView}
      />
    ));
    return (
      <div>
        <button className="btn btn-info" onClick={this.handleChange}>Sort By Newest properties</button>
        <div className="lightHouses row mt-5">
          <h3 className = "lightHouseContainer d-flex mx-auto mt-5">{singleLightHouseComponent}</h3>
        </div>
      </div>
    );
}
}
export default LightHouses;