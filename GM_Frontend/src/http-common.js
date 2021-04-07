import axios from 'axios';

export default axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://goldman-backend.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});

// Remember to change the baseURL, 
// it depends on REST APIs url that your Server configures.