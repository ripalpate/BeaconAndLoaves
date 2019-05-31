import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class Properties extends React.Component {
  state = {
    properties: []
  }

  componentDidMount()
  {
    const uid = authRequests.getCurrentUid();
    propertiesRequests.getProperties(uid)
      .then((properties) => {
        this.setState({ properties });
      }).catch(err => console.error(err));
  }
  render() {
    return (
      <div className="properties">
        <h3><a>LightHouse</a></h3>
      </div>
    );
  }
}

export default Properties;