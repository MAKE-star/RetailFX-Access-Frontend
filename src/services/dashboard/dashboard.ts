import Api from "../api";

class DashboardService extends Api {
  resource = "/dashboard";
  getDashboards = () => {
    return this.get(this.resource);
  };
}

const dashboardService = new DashboardService();
export default dashboardService;
