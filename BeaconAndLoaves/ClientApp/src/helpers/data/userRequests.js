import axios from 'axios';

const apiUrl = "/api/users";

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((results) => {
      const usersObject = results.data;
      resolve(usersObject);
    })
    .catch((error) => {
      reject(error);
    });
});

// const getBeansByArrayOfIds = beanIdsArray => new Promise((resolve, reject) => {
//   axios.get(`${firebaseUrl}/beans.json`)
//     .then((result) => {
//       const beansObject = result.data;
//       const beansArray = [];
//       if (beansObject !== null) {
//         Object.keys(beansObject).forEach((bean) => {
//           beansObject[bean].id = bean;
//           beansArray.push(beansObject[bean]);
//         });
//       }
//       const selectedBeans = beansArray.filter(x => beanIdsArray.includes(x.id));
//       resolve(selectedBeans);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

// const getSingleBean = beanId => axios.get(`${firebaseUrl}/beans/${beanId}.json`);

// const deleteBean = beanId => axios.delete(`${firebaseUrl}/beans/${beanId}.json`);

const createUser = userObject => axios.post(`${apiUrl}/register`, (userObject));

// const updateBean = (beanId, beanObject) => axios.put(`${firebaseUrl}/beans/${beanId}.json`, beanObject);

export default {
  getAllUsers,
  createUser
};