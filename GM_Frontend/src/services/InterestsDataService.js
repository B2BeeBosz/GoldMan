import http from '../http-common';

class InterestsDataService {
  // Create
  create(data) {
    return http.post('/interests', data);
  }

  // Retrieve
  getAllInterests() {
    return http.get('/interests');
  }
  getInterestsByShopId(shopId) {
    return http.get(`/interests/shopId?shopId=${shopId}`);
  }

  // Update
  update(interestId, data) {
    return http.put(`/interests/${interestId}`, data);
  }

  // Delete
  deleteOne(interestId) {
    return http.delete(`/interests/${interestId}`);
  }
  deleteAll() {
    return http.delete('/interests');
  }
};

export default new InterestsDataService();