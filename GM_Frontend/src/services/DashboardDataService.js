import http from '../http-common';

class DashboardDataService {
  // Retrieve Employee Performance
  getEmployeePerfTable() {
    return http.get('/dashboard');
  }

  // GRAPH SECTION //
  // Retrieve Day Graph
  getMonthlyGraph() {
    return http.get('/dashboard/monthly');
  }
  // Retrieve Month Graph
  getYearlyGraph() {
    return http.get('/dashboard/yearly');
  }
  // Retrieve Today Graph
  getTodayGraph() {
    return http.get('/dashboard/today');
  }

  // Create New Graph
  createNewGraph(data) {
    return http.post('/dashboard', data);
  }
  updateCurrentGraph(date, data) {
    return http.put(`/dashboard/monthly/${date}`, data);
  }
};

export default new DashboardDataService();