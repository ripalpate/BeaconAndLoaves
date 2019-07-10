import React from 'react';
import PropTypes from 'prop-types';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import './SingleLightHouse.scss';


class SingleLightHouse extends React.Component {
  static propTypes = {
    lightHouse: propertiesShape,
    lightHouseDetailView: PropTypes.func,
  }

  changeLightHouseToDetailView = (e) => {
    e.preventDefault();
    const { lightHouseDetailView, lightHouse } = this.props;
    lightHouseDetailView(lightHouse.id);
  }

  render() {
    const { lightHouse } = this.props;
    return (
        <div className="card ml-4 mb-3 mt-3 singleLightHouse animated zoomIn" onClick={this.changeLightHouseToDetailView}>
          <div className="imgHolder">
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse"/>
          </div>
          <div className="card-body description">
            <h5>{lightHouse.propertyName}</h5>
            <h6>{lightHouse.city}, {lightHouse.state}</h6>
          </div>
        </div>
    );
  }
}

export default SingleLightHouse;
