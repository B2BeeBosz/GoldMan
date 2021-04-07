import http from '../http-common';

class PledgingHistoryDataService {
  // Retrieve
  getAll() {
    return http.get('/pledgingHistory');
  }
  getHistoryById(id) {
    return http.get(`/pledgingHistory/historyId?historyId=${id}`);
  }

  // Create
  create(data) {
    return http.post('/pledgingHistory', data);
  }

  // Update
  update(historyId) {
    return http.put(`/pledgingHistory/${historyId}`, data);
  }
  // Delete
  deleteOne(historyId) {
    return http.delete(`/pledgingHistory/${historyId}`);
  }
};

export default new PledgingHistoryDataService();