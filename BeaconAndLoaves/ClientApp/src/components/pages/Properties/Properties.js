import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

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
      <div className="properties">
        <div id="lighthouses" onClick={this.pageView}><h3>LightHouse({lightHouse.length})</h3></div>
        <div id="siloNuclears" onClick={this.pageView}><h3>SiloNuclear({siloNuclear.length})</h3></div>
      </div>
    );
  }
}

export default Properties;