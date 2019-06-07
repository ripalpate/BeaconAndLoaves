import React from 'react';
import propertiesShape from '../../../helpers/propz/propertiesShape';
import PropTypes from 'prop-types';

class OwnerPropducts extends React.Component{
    static propTypes = {
        property: propertiesShape
    }

render(){
    const {property} = this.props;
    console.log(property);
    return(
        <div>
           
        </div>
    )
}
}

export default OwnerPropducts;