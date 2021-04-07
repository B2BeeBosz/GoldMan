import http from '../http-common';

class AccountingDataService {
  // Retrieve
  getAll() {
    return http.get(`/accounting`);
  }
  getAllBuy() {
    return http.get(`/accounting/buy`);
  }
  getAllSell() {
    return http.get(`/accounting/sell`);
  }
  findByTransactionId(id) {
    return http.get(`/accounting/transactionId?transactionId=${id}`);
  }
  findByProductId(id) {
    return http.get(`/accounting/productId?productId=${id}`);
  }
  findByProductName(name) {
    return http.get(`/accounting/productName?productName=${name}`);
  }
  findByGroup(group) {
    return http.get(`/accounting/group?group=${group}`);
  }
  findByEmployeeId(id) {
    return http.get(`/accounting/employeeId?employeeId=${id}`);
  }
  findByDate(date) {
    return http.get(`/accounting/date?date=${date}`);
  }

  // Create
  create(data) {
    return http.post('/accounting', data);
  }

  // Update
  update(transactionId, productId, data) {
    return http.put(`/accounting/${transactionId}&${productId}`, data);
  }

  // Delete
  // delete(transactionId, productId) {
  //   return http.delete(`/accounting/${transactionId}&${productId}`);
  // }
  deleteTransaction(transactionId) {
    return http.delete(`/accounting/${transactionId}`);
  }
};

export default new AccountingDataService();