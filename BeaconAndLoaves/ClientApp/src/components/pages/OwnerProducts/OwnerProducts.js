import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class OwnerPropducts extends React.Component{
    state = {
        ownerProperties: [],
    }

    getOwnerProducts = () => {
        propertiesRequests.getProperties()
        .then((properties)=>{
           const getduplicateOwnerIds = properties
                            .map(property => property['ownerId'])
                            .map((property, i, final) => final.indexOf(property) !== i && i)
                            .filter(obj=> properties[obj])
                            .map(property => properties[property]["ownerId"])
            const ownerProperties = properties.filter(property=> getduplicateOwnerIds.includes(property.ownerId));
            this.setState({ownerProperties});
        }).catch(err => console.error(err));
    }

    componentDidMount(){
        this.getOwnerProducts();
    }

render(){
    return(
        <div>

        </div>
    )
}
}

export default OwnerPropducts;