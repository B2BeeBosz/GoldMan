import http from '../http-common';

class RolesDataService {
  // Retrieve All Roles
  getAllRoles() {
    return http.get('/rolesTable');
  }
  findRoleByNameThai(name) {
    return http.get(`/rolesTable/nameThai?nameThai=${name}`);
  }
};

export default new RolesDataService();