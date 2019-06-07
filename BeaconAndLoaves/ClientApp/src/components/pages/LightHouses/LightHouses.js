import React from 'react';
import SingleLightHouse from '../SingleLightHouse/SingleLightHouse';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import './LightHouses.scss';

class LightHouses extends React.Component {
  state = {
    lightHouses: [],
    ascendingOrder: false
  }

  componentDidMount()
  {
    propertiesRequests.getProperties()
      .then((properties) => {
        const lightHouses = properties.filter(property => property.type === 0);
        this.setState({ lightHouses});
      }).catch(err => console.error(err));

      this.sortProperties();
  }

  sortProperties =() => {
    const {ascendingOrder, lightHouses} = this.state;
    if(ascendingOrder === false){
      lightHouses.sort((x, y) => ('' + y.createdOn).localeCompare(x.createdOn));
      this.setState({ lightHouses });
      } else {
          lightHouses.sort((x, y) => ('' + x.createdOn).localeCompare(y.createdOn));
          this.setState({ lightHouses });
      }
  }

  lightHouseDetailView = (lightHouseId) => {
    this.props.history.push(`/lightHouses/${lightHouseId}`);
  }

  handleChange =(e) => {
    const {ascendingOrder} = this.state;
    e.preventDefault();
    this.setState({ascendingOrder: !ascendingOrder});
    this.sortProperties();
  }

  render() {
     const {  ascendingOrder, lightHouses } = this.state;
     
     const singleLightHouseComponent = lightHouses.map(lightHouse => (
      <SingleLightHouse
      lightHouse={lightHouse}
      key = {lightHouse.id}
      lightHouseDetailView = {this.lightHouseDetailView}
      />
    ));

    const makeLatestButton = () => {
      if(ascendingOrder) {
        return(
          <div className="float-right sort-btn">
            <label htmlFor="sort">Sort By</label>
            <button className="btn" onClick={this.handleChange}><i className="far fa-arrow-alt-circle-up fa-2x" onClick={this.handleChange}></i></button>
          </div>
        )
      } else {
        return(
          <div className="float-right sort-btn">
            <label htmlFor="sort">Sort By</label>
            <button className="btn" onClick={this.handleChange}><i className="far fa-arrow-alt-circle-down fa-2x" onClick={this.handleChange}></i></button>
        </div>
        )
      }
    }
    return (
      <div>
        {makeLatestButton()}
        <div className="lightHouses row">
          <div className = "lightHouseContainer d-flex mx-auto mt-5">{singleLightHouseComponent}</div>
        </div>
      </div>
    );
}
}
export default LightHouses;