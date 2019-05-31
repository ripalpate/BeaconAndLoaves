import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import './Properties.scss';

class Properties extends React.Component {
  state = {
    properties: [],
    lightHouse: [],
    siloNuclear: []
  }

  componentDidMount()
  {
    propertiesRequests.getProperties()
      .then((properties) => {
        const lightHouse = properties.filter(property => property.type === 0);
        const siloNuclear = properties.filter(property => property.type === 1);
        this.setState({ lightHouse, properties });
        this.setState({ siloNuclear, properties });
      }).catch(err => console.error(err));
  }

  pageView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`properties/${view}`);
  }

  render() {
    const {lightHouse,siloNuclear } = this.state;
    return (
      <div className="properties d-flex">
        <div id="lighthouses" onClick={this.pageView}>
          <h3>LightHouse({lightHouse.length})</h3>
          <img className="lighthouse-img" src="https://www.millerheimangroup.com/wp-content/uploads/2018/09/lighthouse.jpg" alt="lighthouse" width = "500"/>
        </div>
        <div id="siloNuclears" onClick={this.pageView}>
          <h3>SiloNuclear({siloNuclear.length})</h3>
          <img className="siloNuclear-img" src="http://2.bp.blogspot.com/_88RoabsTacs/TJGk5wVnmoI/AAAAAAAADyg/J-Ve5gCymdg/s1600/IMG_5560.JPG" alt="siloNuclear" width = "500"/>
        </div>
      </div>
    );
  }
}

export default Properties;