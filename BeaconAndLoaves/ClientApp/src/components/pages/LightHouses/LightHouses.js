import React from 'react';
import SearchField from 'react-search-field';
import { Tooltip } from 'reactstrap';
import SingleLightHouse from '../SingleLightHouse/SingleLightHouse';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import './LightHouses.scss';

class LightHouses extends React.Component {
  state = {
    lightHouses: [],
    ascendingOrder: false,
    filteredLightHouses: [],
    isSearching: false,
    searchTipOpen: false,
  }

  getAllLightHouses = () => {
    propertiesRequests.getProperties()
      .then((properties) => {
        const lightHouses = properties.filter(property => property.type === 0 && property.isActive === true);
        this.setState({ lightHouses });
        this.setState({ filteredLightHouses: lightHouses });
      }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.getAllLightHouses();
    this.sortProperties();
  }

  toggleSearch = () => {
    const { isSearching, lightHouses } = this.state;
    this.setState({ isSearching: !isSearching, filteredLightHouses: lightHouses });
  }

  toggleSearchTip = () => {
    const { searchTipOpen } = this.state;
    this.setState({
      searchTipOpen: !searchTipOpen,
    });
  }

  onChange = (value, event) => {
    const { lightHouses } = this.state;
    const filteredLightHouses = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredLightHouses: lightHouses });
    } else {
      lightHouses.forEach((lightHouse) => {
        if (lightHouse.propertyName.toLowerCase().includes(value.toLowerCase()) || lightHouse.city.toLowerCase().includes(value.toLowerCase())
        || lightHouse.state.toLowerCase().includes(value.toLowerCase())) {
          filteredLightHouses.push(lightHouse);
        }
        this.setState({ filteredLightHouses });
      });
    }
  }

  searchOnEnter = () => {
    const { lightHouses } = this.state;
    this.setState({ isSearching: false, filteredLightHouses: lightHouses });
  }

  sortProperties =() => {
    const { ascendingOrder, lightHouses } = this.state;
    if (ascendingOrder === false) {
      lightHouses.sort((x, y) => (`${ y.createdOn}`).localeCompare(x.createdOn));
      this.setState({ lightHouses });
    } else {
      lightHouses.sort((x, y) => (`${x.createdOn}`).localeCompare(y.createdOn));
      this.setState({ lightHouses });
    }
  }

  backButton = () => {
    this.props.history.push('/properties');
  }

  lightHouseDetailView = (lightHouseId) => {
    this.props.history.push(`/lightHouses/${lightHouseId}`);
  }

  handleChange =(e) => {
    const { ascendingOrder } = this.state;
    e.preventDefault();
    this.setState({ ascendingOrder: !ascendingOrder });
    this.sortProperties();
  }


  render() {
    const {
      ascendingOrder,
      isSearching,
      filteredLightHouses,
    } = this.state;

    const makeSearch = () => {
      if (isSearching) {
        return (
            <SearchField
              placeholder="Search By name, city or state"
              onChange={ this.onChange }
              searchText=""
              classNames="test-class w-50"
              onEnter={this.searchOnEnter}
            />
        );
      }
      return (<div></div>);
    };

    const singleLightHouseComponent = filteredLightHouses.map(lightHouse => (
      <SingleLightHouse
      lightHouse={lightHouse}
      key = {lightHouse.id}
      lightHouseDetailView = {this.lightHouseDetailView}
      />
    ));

    const makeLatestButton = () => {
      if (ascendingOrder) {
        return (
          <div className="float-right sort-btn animated slideInDown">
            <label htmlFor="sort">Sort By</label>
            <button className="btn" onClick={this.handleChange}><i className="far fa-arrow-alt-circle-up fa-2x" onClick={this.handleChange}></i></button>
          </div>
        );
      }
      return (
          <div className="float-right sort-btn animated slideInDown">
            <label htmlFor="sort">Sort By</label>
            <button className="btn" onClick={this.handleChange}><i className="far fa-arrow-alt-circle-down fa-2x" onClick={this.handleChange}></i></button>
        </div>
      );
    };
    return (
      <div>
        <div className="serach-sort-container ml-2 animated slideInDown">
        <button className = "bttn-pill bttn-md" onClick = {this.backButton} title="Back to All Properties"><i className="far fa-arrow-alt-circle-left"></i></button>
          <button
            id="search-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-primary ml-2"
            onClick={this.toggleSearch}>
            <i className="fas fa-search" />
          </button>
          <Tooltip placement="right" isOpen={this.state.searchTipOpen} target="search-btn" toggle={this.toggleSearchTip}>
            Search lightHouses
          </Tooltip>
            {makeLatestButton()}
            {makeSearch()}
        </div>
        <div className="lightHouses">
          <div className = "d-flex flex-wrap justify-content-center mt-3 w-75">{singleLightHouseComponent}</div>
        </div>
      </div>
    );
  }
}
export default LightHouses;
