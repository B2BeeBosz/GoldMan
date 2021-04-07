import http from '../http-common';

class ShopsDataService {
  // Create
  create(data) {
    return http.post('/shops', data);
  }
  // Retrieve
  getAllShops() {
    return http.get('/shops');
  }
  getOneShopById(id) {
    return http.get(`/shops/shopId?shopId=${id}`)
  }
  // Update
  update(shopId, data) {
    return http.put(`/shops/${shopId}`, data);
  }
  // Delete
  deleteOne(shopId) {
    return http.delete(`/shops/${shopId}`);
  }
  deleteAll() {
    return http.delete('/shops');
  }
};

export default new ShopsDataService();