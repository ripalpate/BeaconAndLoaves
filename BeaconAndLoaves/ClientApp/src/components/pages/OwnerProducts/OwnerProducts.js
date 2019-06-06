import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
class OwnerPropducts extends React.Component{
    state = {
        ownerPropducts: [],
    }

    getOwnerProducts = () => {
        propertiesRequests.getProperties()
        .then((properties)=>{
           const getduplicateOwnerIds = properties
                            .map(property => property['ownerId'])
                            .map((property, i, final) => final.indexOf(property) !== i && i)
                            .filter(obj=> properties[obj])
                            .map(property => properties[property]["ownerId"])
            const ownerPropducts = properties.filter(property=> getduplicateOwnerIds.includes(property.ownerId));
            this.setState({ownerPropducts});
        }).catch(err => console.error(err));
    }

    componentDidMount(){
        this.getOwnerProducts();
    }

render(){
    return(
        <div>Welcome

        </div>
    )
}
}

export default OwnerPropducts;