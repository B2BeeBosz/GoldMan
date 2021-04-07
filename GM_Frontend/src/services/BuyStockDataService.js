import http from '../http-common';

class BuyStockDataService {
  // Retrieve
  getAll() {
    return http.get('/buyStock');
  }
  findByStockId(id) {
    return http.get(`/buyStock/stockId?stockId=${id}`)
  }
  // Filter
  // Create
  create(data) {
    return http.post('/buyStock', data);
  }
  // Update
  update(stockId, data) {
    return http.put(`/buyStock/${stockId}`, data);
  }
  // Delete
  deleteOne(stockId) {
    return http.delete(`/buyStock/${stockId}`);
  }
  deleteAll() {
    return http.delete('/buyStock');
  }
};

export default new BuyStockDataService();