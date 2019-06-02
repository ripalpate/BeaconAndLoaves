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
          //console.log(propertiesObject);
        });
    })
    .catch(err => reject(err));
});

export default {
  getAllPropertiesWithOwnerInfo
}