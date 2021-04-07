import http from '../http-common';

class PledgingDataService {
  // Create
  create(data) {
    return http.post('/pledging', data);
  }

  // Retrieve
  getAllTransactions() {
    return http.get('/pledging');
  }
  findById(id) {
    return http.get(`/pledging/transactionId?transactionId=${id}`);
  }
  findByStartDate(date) {
    return http.get(`/pledging/date?date=${date}`);
  }
  findByDueDate(date) {
    return http.get(`/pledging/dueDate?dueDate=${date}`);
  }
  findByNextDueDate(date) {
    return http.get(`/pledging/nextDueDate?nextDueDate=${date}`);
  }
  findByCustomerName(name) {
    return http.get(`/pledging/customerName?customerName=${name}`);
  }
  
  // Update
  update(transactionId, data) {
    return http.put(`/pledging/${transactionId}`, data);
  }
  deleteByFlag(transactionId, data) {
    return http.put(`/pledging/${transactionId}`, data);
  }

  // Delete
  deleteOneTransaction(transactionId) {
    return http.delete(`/pledging/${transactionId}`);
  }
  deleteAll() {
    return http.delete(`/pledging`);
  }
};

export default new PledgingDataService();