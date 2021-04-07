import http from '../http-common';

class UsersDataService {
  // Retrieve
  findById(id) {
    return http.get(`/users/userId?userId=${id}`);
  }

  // Create
  create(data) {
    return http.post('/users', data);
  }

  // Update
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  // Delete
  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UsersDataService();