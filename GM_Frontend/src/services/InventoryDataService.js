import http from '../http-common';

class InventoryDataService {
  // Retrieve
  getAll() {
    return http.get('/inventory');
  }
  getAllByShopId(id) {
    return http.get(`/inventory/shopId?shopId=${id}`);
  }
  findById(id) {
    return http.get(`/inventory/productId?productId=${id}`);
  }
  findByCategory(category) {
    return http.get(`/inventory/category?category=${category}`);
  }
  findByGroup(group) {
    return http.get(`/inventory/group?group=${group}`);
  }
  findByStyleName(name) {
    return http.get(`/inventory/styleName?styleName=${name}`);
  }

  // Create
  create(data) {
    return http.post('/inventory', data);
  }

  // Update
  update(id, data) {
    return http.put(`/inventory/${id}`, data);
  }
  
  // Delete
  delete(id) {
    return http.delete(`/inventory/${id}`);
  }
  deleteAll() {
    return http.delete('/inventory');
  }
};

export default new InventoryDataService();