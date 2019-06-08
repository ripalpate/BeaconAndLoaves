import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import SingleOwnerProperty from '../SingleOwnerProperty/SingleOwnerProperty';

class OwnerPropducts extends React.Component{
    state = {
        properties: []
    }

    getOwnerProperties =() => {
        const ownerId =  this.props.match.params.id;
        console.log(ownerId);
        userRequests.getUserProperties(ownerId)
        .then((properties)=> {
        this.setState({properties});
        console.log(properties);
    });
    }

    componentDidMount(){
        this.getOwnerProperties();
    }

    backButton = () => {
        this.props.history.push('/properties');
    }
render(){
    const {properties} = this.state;

    const ownerPropertyComponent = properties.map(property => (
        <SingleOwnerProperty
        property={property}
        key = {property.id}
        />
      ));
    return(
        <div>
            <div className="back-button">
              <button className = "btn btn-warning" onClick = {this.backButton}>Back</button>
            </div>
            <div className = "row">
            {ownerPropertyComponent}
            </div>
        </div>
    )
}
}

export default OwnerPropducts;