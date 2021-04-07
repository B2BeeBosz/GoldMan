import http from '../http-common';

class EmployeesDataService {
  // Retrieve
  getAll() {
    return http.get('/employees');
  }
  findById(id) {
    return http.get(`/employees/employeeId?employeeId=${id}`);
  }
  findByPosition(position) {
    return http.get(`/employees/position?position=${position}`);
  }
  findByName(name) {
    return http.get(`/employees/employeeName?employeeName=${name}`);
  }
  // findNotApproved() {
  //   return http.get(`/employees/notApproved`);
  // }

  // Create
  create(data) {
    return http.post('/employees', data);
  }
  
  // Update
  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  // Delete
  delete(id) {
    return http.delete(`/employees/${id}`);
  }
}

export default new EmployeesDataService();