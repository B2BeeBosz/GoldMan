import http from '../http-common';

class PledgingStockDataService {
  // Create
  create(data) {
    return http.post('/pledgingInventory', data);
  }
  // Retrieve
  getAllStock() {
    return http.get('/pledgingInventory');
  }
  // Filter
  findByStockId(id) {
    return http.get(`/pledgingInventory/stockId?stockId=${id}`);
  }
  findByTransactionId(id) {
    return http.get(`/pledgingInventory/transactionId?transactionId=${id}`);
  }
  findByProductName(name) {
    return http.get(`/pledgingInventory/productName?productName=${name}`);
  }
  findByCustomerName(name) {
    return http.get(`/pledgingInventory/customerName?customerName=${name}`);
  }
  // Update
  update(stockId, data) {
    return http.put(`/pledgingInventory/${stockId}`, data);
  }
  // Delete
  deleteOne(stockId) {
    return http.delete(`/pledgingInventory/${stockId}`);
  }
  deleteAll() {
    return http.delete('/pledgingInventory');
  }
}

export default new PledgingStockDataService(); 