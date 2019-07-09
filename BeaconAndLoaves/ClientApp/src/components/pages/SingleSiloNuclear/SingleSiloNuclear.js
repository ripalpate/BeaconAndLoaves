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
        <div className="card ml-4 mb-3 mt-3 singleSiloNuclear animated zoomIn" onClick={this.changeSiloNuclearToDetailView}>
          <div className="imgHolder">
            <img className="singleSiloNuclearImg"src={siloNuclear.imageUrl} alt="siloNuclear site"/>
          </div>
          <div className="card-body description">
            <h5>{siloNuclear.propertyName}</h5>
            <h6>{siloNuclear.city}, {siloNuclear.state}</h6>
          </div>
        </div>
    );
  }
}

export default SingleSiloNuclear;
