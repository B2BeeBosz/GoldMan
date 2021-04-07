import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/role/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getShopOwnerContent() {
    return axios.get(API_URL + 'shopOwner', { 
      headers: authHeader()
    });
  }
  getShopAdminContent() {
    return axios.get(API_URL + 'shopAdmin', {
      headers: authHeader()
    });
  }
  getSalesEmployeeContent() {
    return axios.get(API_URL + 'salesEmployee', {
      headers: authHeader()
    });
  }
  getCustomerContent() {
    return axios.get(API_URL + 'customer', {
      headers: authHeader()
    });
  }
};

export default new UserService();

