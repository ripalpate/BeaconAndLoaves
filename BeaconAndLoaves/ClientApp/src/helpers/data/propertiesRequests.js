import axios from 'axios';

const apiUrl = '/api/properties';

const getProperties = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const properties = results.data;
      // const properties = [];
      // if (results.data !== null) {
      //   Object.keys(results.data).forEach((key) => {
      //     results.data[key].id = key;
      //     properties.push(results.data[key]);
      //   });
      // }
      //console.log(properties);
      resolve(properties);
    })
    .catch(err => reject(err));
});

export default {
  getProperties,
};