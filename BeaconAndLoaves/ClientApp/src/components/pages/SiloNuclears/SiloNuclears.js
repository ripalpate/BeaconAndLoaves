import React from 'react';
import SingleSiloNuclear from '../SingleSiloNuclear/SingleSiloNuclear';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class SiloNuclears extends React.Component {
  state = {
    siloNuclears: []
  }

  componentDidMount()
  {
    propertiesRequests.getProperties()
      .then((properties) => {
        const siloNuclears = properties.filter(property => property.type === 1);
        this.setState({ siloNuclears });
      }).catch(err => console.error(err));
  }
  siloNuclearDetailView = (siloNuclearId) => {
    this.props.history.push(`/properties/siloNuclears/${siloNuclearId}`);
  }

  render() {
     const {  siloNuclears } = this.state;
    const singleSiloNuclearComponent = siloNuclears.map(siloNuclear => (
      <SingleSiloNuclear
      siloNuclear={siloNuclear}
      key = {siloNuclear.id}
      siloNuclearDetailView = {this.siloNuclearDetailView}
      />
    ));
    return (
        <div className="siloNuclears row mt-5">
          <h3 className = "d-flex mx-auto mt-5">{ singleSiloNuclearComponent}</h3>
        </div>
    );
}
}

export default SiloNuclears;