import React from 'react';
import SearchField from 'react-search-field';
import { Tooltip } from 'reactstrap';
import SingleSiloNuclear from '../SingleSiloNuclear/SingleSiloNuclear';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import './SiloNuclears.scss';

class SiloNuclears extends React.Component {
  state = {
    siloNuclears: [],
    ascendingOrder: false,
    filteredSiloNuclears: [],
    isSearching: false,
    searchTipOpen: false,
  }

  getSiloNuclears = () => {
    propertiesRequests.getProperties()
      .then((properties) => {
        const siloNuclears = properties.filter(property => property.type === 1 && property.isActive === true);
        this.setState({ siloNuclears });
        this.setState({ filteredSiloNuclears: siloNuclears });
      }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.getSiloNuclears();
    this.sortProperties();
  }

  toggleSearch = () => {
    const { isSearching, siloNuclears } = this.state;
    this.setState({ isSearching: !isSearching, filteredSiloNuclears: siloNuclears });
  }

  toggleSearchTip = () => {
    const { searchTipOpen } = this.state;
    this.setState({
      searchTipOpen: !searchTipOpen,
    });
  }


  onChange = (value, event) => {
    const { siloNuclears } = this.state;
    const filteredSiloNuclears = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredSiloNuclears: siloNuclears });
    } else {
      siloNuclears.forEach((siloNuclear) => {
        if (siloNuclear.propertyName.toLowerCase().includes(value.toLowerCase()) || siloNuclear.city.toLowerCase().includes(value.toLowerCase())
        || siloNuclear.state.toLowerCase().includes(value.toLowerCase())) {
          filteredSiloNuclears.push(siloNuclear);
        }
        this.setState({ filteredSiloNuclears });
      });
    }
  }


  onEnter = () => {
    const { siloNuclears } = this.state;
    this.setState({ isSearching: false, filteredSiloNuclears: siloNuclears });
  }

  sortProperties =() => {
    const { ascendingOrder, siloNuclears } = this.state;
    if (ascendingOrder === false) {
      siloNuclears.sort((x, y) => (`${ y.createdOn}`).localeCompare(x.createdOn));
      this.setState({ siloNuclears });
    } else {
      siloNuclears.sort((x, y) => (`${x.createdOn}`).localeCompare(y.createdOn));
      this.setState({ siloNuclears });
    }
  }

  backButton = () => {
    this.props.history.push('/properties');
  }

  handleChange =(e) => {
    const { ascendingOrder } = this.state;
    e.preventDefault();
    this.setState({ ascendingOrder: !ascendingOrder });
    this.sortProperties();
  }

  siloNuclearDetailView = (siloNuclearId) => {
    this.props.history.push(`/siloNuclears/${siloNuclearId}`);
  }

  render() {
    const { ascendingOrder, filteredSiloNuclears, isSearching } = this.state;

    const makeSearch = () => {
      if (isSearching) {
        return (
          <SearchField
            placeholder="Search By name, city or state"
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-50"
            onEnter={this.onEnter}
          />
        );
      }

      return (<div></div>);
    };
    const singleSiloNuclearComponent = filteredSiloNuclears.map(siloNuclear => (
      <SingleSiloNuclear
      siloNuclear={siloNuclear}
      key = {siloNuclear.id}
      siloNuclearDetailView = {this.siloNuclearDetailView}
      />
    ));

    const makeLatestButton = () => {
      if (ascendingOrder) {
        return (
          <div className="float-right sort-btn">
            <label htmlFor="sort">Sort By</label>
            <button className="btn" onClick={this.handleChange}><i className="far fa-arrow-alt-circle-up fa-2x" onClick={this.handleChange}></i></button>
          </div>
        );
      }
      return (
          <div className="float-right sort-btn">
            <label htmlFor="sort">Sort By</label>
            <button className="btn" onClick={this.handleChange}><i className="far fa-arrow-alt-circle-down fa-2x" onClick={this.handleChange}></i></button>
        </div>
      );
    };
    return (
      <div>
        <div className="serach-sort-container">
          <button className = "bttn-pill bttn-md" onClick = {this.backButton} title="Back to All Properties"><i className="far fa-arrow-alt-circle-left"></i></button>
          <button
            id="search-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-primary ml-2"
            onClick={this.toggleSearch}>
            <i className="fas fa-search" />
          </button>
          <Tooltip placement="right" isOpen={this.state.searchTipOpen} target="search-btn" toggle={this.toggleSearchTip}>
            Search Silo Nuclears
          </Tooltip>
            {makeLatestButton()}
            {makeSearch()}
        </div>
        <div className="siloNuclears row mt-5">
          <h3 className = "d-flex mx-auto mt-5">{ singleSiloNuclearComponent}</h3>
        </div>
      </div>
    );
  }
}

export default SiloNuclears;
