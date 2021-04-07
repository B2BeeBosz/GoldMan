import http from '../http-common';

class CustomersDataService {
  // Retrieve
  getAll() {
    return http.get('/customer');
  }
  getCustomerById(id) {
    return http.get(`/customer/customerId?customerId=${id}`);
  }
  getCustomerByCitizenId(id) {
    return http.get(`/customer/citizenId?citizenId=${id}`);
  }

  // Create
  create(data) {
    return http.post('/customer', data);
  }

  // Update
  update(customerId, data) {
    return http.put(`/customer/${customerId}`, data);
  }

  // Delete
  deleteOne(customerId) {
    return http.delete(`/customer/${customerId}`);
  }
  deleteAll() {
    return http.delete('/customer');
  }
};

export default new CustomersDataService();