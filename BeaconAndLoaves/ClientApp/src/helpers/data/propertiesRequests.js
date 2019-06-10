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

const getSingleProperty = propertyId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${propertyId}`)
    .then((result) => {
      const singleProperty = result.data;
      singleProperty.id = propertyId;
      resolve(singleProperty);
    }).catch(err => reject(err));
});

const createProperty = property => axios.post(`${apiUrl}`, property);

const updateProperty = (propertyId, property) => axios.put(`${apiUrl}/${propertyId}`, property);

export default {
  getProperties,
  getSingleProperty,
  createProperty,
  updateProperty
};
