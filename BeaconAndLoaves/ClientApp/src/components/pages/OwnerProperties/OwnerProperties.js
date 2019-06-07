import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import SingleOwnerProperty from '../SingleOwnerProperty/SingleOwnerProperty';

class OwnerPropducts extends React.Component{
    state = {
        properties: [],
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
           {ownerPropertyComponent}
        </div>
    )
}
}

export default OwnerPropducts;