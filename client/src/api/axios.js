import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'http://outdoors-server.mri.web.id',
});

export default axiosInstance;
