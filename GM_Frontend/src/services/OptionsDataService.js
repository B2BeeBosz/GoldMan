import http from '../http-common';

class OptionsDataService {
  // Retrieve
  getAllGroups() {
    return http.get('/productGroups');
  }
  getAllCategories() {
    return http.get('/productCategories');
  }
  getAllWeights() {
    return http.get('/productWeights');
  }

  // Create
  createGroup(data) {
    return http.post('/productGroups', data);
  }
  createCategory(data) {
    return http.post('/productCategories', data);
  }
  createWeight(data) {
    return http.post('/productWeights', data);
  }

  // Update
  updateGroups(groupId, data) {
    return http.put(`/productGroups/${groupId}`, data);
  }
  updateCategories(categoryId, data) {
    return http.put(`/productCategories/${categoryId}`, data);
  }
  updateWeights(bahtId, data) {
    return http.put(`/productWeights/${bahtId}`, data);
  }

  // Delete One Item
  deleteOneFromGroups(groupId) {
    return http.delete(`/productGroups/${groupId}`);
  }
  deleteOneFromCategories(categoryId) {
    return http.delete(`/productCategories/${categoryId}`);
  }
  deleteOneFromWeights(bahtId) {
    return http.delete(`/productWeights/${bahtId}`);
  }
  // Delete All Items
  deleteAllGroups() {
    return http.delete('/productGroups');
  }
  deleteAllCategories() {
    return http.delete('/productCategories');
  }
  deleteAllWeights() {
    return http.delete('/productWeights');
  }
};

export default new OptionsDataService();