import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
  login(user) {
    return axios.post(API_URL + 'signin', {
      email: user.email,
      password: user.password
    }).then(res => {
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }

      return res.data;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
    //   username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();