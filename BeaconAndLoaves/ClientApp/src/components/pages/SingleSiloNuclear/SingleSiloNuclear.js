import React from 'react';
import PropTypes from 'prop-types';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleSiloNuclear.scss';


class SingleSiloNuclear extends React.Component {
  static propTypes = {
    siloNuclear: propertiesShape,
    siloNuclearDetailView: PropTypes.func,
  }

  changeSiloNuclearToDetailView = (e) => {
    e.preventDefault();
    const { siloNuclearDetailView, siloNuclear } = this.props;
    siloNuclearDetailView(siloNuclear.id);
  }

  render() {
    const { siloNuclear } = this.props;
    return (
        <div className="card ml-4 bg-light mb-3 mt-3 singleSiloNuclear" onClick={this.changeSiloNuclearToDetailView}>
          <div className="imgHolder">
            <img className="singleSiloNuclearImg"src={siloNuclear.imageUrl} alt="siloNuclear site"/>
          </div>
          <div className="card-body">
            <h5>Name: {siloNuclear.propertyName}</h5>
            <h6>Where: {siloNuclear.city}, {siloNuclear.state}</h6>
          </div>
        </div>
    );
  }
}

export default SingleSiloNuclear;
