import axios from 'axios';

const apiUrl = '/api/properties';

const getProperties = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const propertiesObject = results.data;
     //console.log(propertiesObject);
      resolve(propertiesObject);
    })
    .catch(err => reject(err));
});

export default {
  getProperties,
};