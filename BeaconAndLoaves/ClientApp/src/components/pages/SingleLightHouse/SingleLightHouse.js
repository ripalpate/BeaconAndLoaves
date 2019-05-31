import React from 'react';
import PropTypes from 'prop-types';
import lightHousesShape from '../../../helpers/propz/lightHousesShape';
import './SingleLightHouse.scss';



class SingleLightHouse extends React.Component {
  static propTypes = {
    lightHouse: lightHousesShape,
    lightHouseDetailView: PropTypes.func
  }

  changeLightHouseToDetailView = (e) => {
    e.preventDefault();
    const { lightHouseDetailView, lightHouse } = this.props;
    lightHouseDetailView(lightHouse.id);
  }

  render() {
    const {lightHouse} = this.props;
    return (
        <div className="card ml-4 bg-light mb-3 singleLightHouse" onClick={this.changeLightHouseToDetailView}>
          <div className="imgHolder">
            <img className="singleLightHouseImg"src={lightHouse.imageUrl} alt="lighthouse" width="500"/>
          </div>
          <div className="card-body">
            <h5>Name: {lightHouse.propertyName}</h5>
            <h6>Where: {lightHouse.city}, {lightHouse.state}</h6>
          </div>
        </div>
    );
  }
}

export default SingleLightHouse;
