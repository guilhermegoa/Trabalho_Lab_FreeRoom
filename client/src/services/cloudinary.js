import axios from 'axios';

const cloudinary = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/matheusfm',
});

export default cloudinary;
