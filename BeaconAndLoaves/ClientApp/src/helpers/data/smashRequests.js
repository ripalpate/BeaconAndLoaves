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

// const getProducts = () => new Promise((resolve,reject) => {
//   let users = [];
//   userRequests.getAllUsers()
//     .then((usrs) => {
//       users = usrs;
//      // console.log(users);
//       propertiesRequests.getProperties()
//       .then((properties)=>{
//         users.forEach((user) => {
//           const matchingProp = properties.filter(x => x.ownerId === user.id);
//           users.push(matchingProp);     
//       })
//       console.log(users);
// })
//    })
// });


export default {
  getAllPropertiesWithOwnerInfo,
 // getProducts
}