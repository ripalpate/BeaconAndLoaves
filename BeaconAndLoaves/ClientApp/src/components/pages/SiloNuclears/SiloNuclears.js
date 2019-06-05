import React from 'react';
import SingleSiloNuclear from '../SingleSiloNuclear/SingleSiloNuclear';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class SiloNuclears extends React.Component {
  state = {
    siloNuclears: [],
    ascendingOrder: false
  }

  componentDidMount()
  {
    propertiesRequests.getProperties()
      .then((properties) => {
        const siloNuclears = properties.filter(property => property.type === 1);
        this.setState({ siloNuclears });
      }).catch(err => console.error(err));

      this.sortProperties();
  }

  sortProperties =() => {
    const {ascendingOrder, siloNuclears} = this.state;
    if(ascendingOrder === false){
      siloNuclears.sort((x, y) => ('' + y.createdOn).localeCompare(x.createdOn));
      this.setState({ siloNuclears });
      } else {
          siloNuclears.sort((x, y) => ('' + x.createdOn).localeCompare(y.createdOn));
          this.setState({ siloNuclears });
      }
  }

  handleChange =(e) => {
    const {ascendingOrder} = this.state;
    e.preventDefault();
    this.setState({ascendingOrder: !ascendingOrder});
    this.sortProperties();
  }

  siloNuclearDetailView = (siloNuclearId) => {
    this.props.history.push(`/siloNuclears/${siloNuclearId}`);
  }

  render() {
    const { ascendingOrder, siloNuclears } = this.state;
    const singleSiloNuclearComponent = siloNuclears.map(siloNuclear => (
      <SingleSiloNuclear
      siloNuclear={siloNuclear}
      key = {siloNuclear.id}
      siloNuclearDetailView = {this.siloNuclearDetailView}
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
        <div className="siloNuclears row mt-5">
          <h3 className = "d-flex mx-auto mt-5">{ singleSiloNuclearComponent}</h3>
        </div>
      </div>
    );
}
}

export default SiloNuclears;