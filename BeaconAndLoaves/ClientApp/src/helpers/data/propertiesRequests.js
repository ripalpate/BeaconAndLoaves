import axios from 'axios';

const apiUrl = '/api/properties';

const getProperties = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const properties = results.data;
      resolve(properties);
    })
    .catch(err => reject(err));
});

export default {
  getProperties,
};