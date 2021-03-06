import userRequests from './userRequests';
import propertiesRequests from './propertiesRequests';

const getAllPropertiesWithOwnerInfo = () => new Promise((resolve, reject) => {
  let users = [];
  userRequests.getAllUsers()
    .then((usrs) => {
      users = usrs;
      propertiesRequests.getProperties()
        .then((properties) => {
          const propertiesObject = properties.map(property => Object.assign({ ...users.find(x => x.id === property.ownerId), ...property }));
          resolve(propertiesObject);
        });
    })
    .catch(err => reject(err));
});

const getSinglePropertyWithOwnerInfo = propertyId => new Promise((resolve, reject) => {
  let allUsers = [];
  userRequests.getAllUsers()
    .then((usrs) => {
      allUsers = usrs;
      propertiesRequests.getSingleProperty(propertyId)
        .then((property) => {
          const propertyObject = Object.assign({ ...allUsers.find(user => user.id === property.ownerId), ...property });
          resolve(propertyObject);
        });
    }).catch(err => reject(err));
});

export default {
  getAllPropertiesWithOwnerInfo,
  getSinglePropertyWithOwnerInfo,
};
