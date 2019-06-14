import axios from 'axios';

const apiUrl = '/api/likedProperties';

const createLikedProperty = likedProperty => axios.post(`${apiUrl}`, likedProperty);

const getAllLikedProperties = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const likedProperties = results.data;
      resolve(likedProperties);
    })
    .catch(err => reject(err));
});

const getSingleLikedProperty = likedPropertyId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${likedPropertyId}`)
    .then((result) => {
      console.log(result);
      const singleLikedProperty = result.data;
      singleLikedProperty.id = likedPropertyId;
      console.log(singleLikedProperty);
      resolve(singleLikedProperty);
    }).catch(err => reject(err));
});

const deleteLikedProperty = likedPropertyId => axios.delete(`${apiUrl}/${likedPropertyId}`);

export default {
  getAllLikedProperties,
  createLikedProperty,
  deleteLikedProperty,
  getSingleLikedProperty,
}
;