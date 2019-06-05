import axios from 'axios';

const apiUrl = '/api/likedProperties';

const createLikedProperty = likedProperty =>  axios.post(`${apiUrl}`, likedProperty);

const getSingleLikedProperty = likedPropertyId => new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/${likedPropertyId}`)
      .then((result) => {
        const singleLikedProperty = result.data;
       // singleProperty.id = propertyId;
        console.log(singleLikedProperty);
      //  resolve(singleProperty);
      }).catch(err => reject(err));
  });

const getAllLikedProperties = () => new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const likedProperties = results.data;
        resolve(likedProperties);
      })
      .catch(err => reject(err));
  });

const deleteLikedProperty = likedPropertyId => axios.delete(`${apiUrl}/${likedPropertyId}`);

export default {
    getAllLikedProperties,
    createLikedProperty,
    getSingleLikedProperty,
    deleteLikedProperty
}