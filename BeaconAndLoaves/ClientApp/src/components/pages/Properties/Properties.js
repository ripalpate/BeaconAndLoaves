import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import './Properties.scss';

class Properties extends React.Component {
  state = {
    properties: [],
    lightHouse: [],
    siloNuclear: [],
  }

  componentDidMount() {
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
    const { lightHouse, siloNuclear } = this.state;
    return (
      <div className="Properties mx-auto">
      <div className="card-columns animated zoomIn mt-5">
        <div className="card text-center" id="lighthouses" onClick={this.pageView}>
          <h3 className="card-title property-title">Lighthouses({lightHouse.length})</h3>
          <img className="card-image-top lighthouse-img pt-2" src="http://tshega.org/wp-content/uploads/2018/04/lighthouse.png" alt="lighthouse" width = "180px"/>
        </div>
        <div className="card text-center ml-5" id="siloNuclears" onClick={this.pageView}>
          <h3 className="property-title pb-2">Nuclear Silos({siloNuclear.length})</h3>
          <i className="card-image-top p-3 fas fa-rocket fa-10x"></i>
        </div>
      </div>
      </div>
    );
  }
}

export default Properties;
