import Api from "../api";

class BranchSettleService extends Api {
  resource = "branchsettles";
  resource1 = "branchsettle";

  
  getBranchSettles = (page?: number) => {
    return this.get(`${this.resource}?page=${page}`);
  };

  getBranchSettle = (branchId: number) => {
    return this.get(`${this.resource1}/${branchId}`);
  };

  createBranchSettle = (data: any) => {
    return this.post(`${this.resource}/create`, data);
  };

  editBranchSettle = (data: any) => {
    return this.put(`${this.resource1}/${data.branchId}`, data);
  };
  deleteBranchSettle = (branchId: any) => {
    return this.delete(`${this.resource1}/${branchId}`);
  };
  getNostroAccounts = (search: any) => {
    return this.get(`${this.resource1}/search?search=${search}`);
  };
}

const branchSettleService = new BranchSettleService();
export default branchSettleService;
