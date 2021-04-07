import http from '../http-common';

class GoldPricesDataService {
  // Create
  postLatestPrices(data) {
    return http.post('/goldprices', data);
  }
  
  // Retrieve
  findAll() {
    return http.get('/goldprices');
  }
  findTodayLatest(date) {
    return http.get(`/goldprices/date?date=${date}`);
  }
  
  // Update
  update(id, data) {
    return http.put(`/goldprices/${id}`, data);
  }

  // Delete
  delete(id) {
    return http.delete(`/goldprices/${id}`);
  }
}

export default new GoldPricesDataService();