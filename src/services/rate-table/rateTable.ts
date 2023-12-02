import Api from "../api";

class RateTableService extends Api {
  resource = "rate-table";
  currency='currencies'
  getRateTables = () => {
    return this.get(this.resource);
  };
  getCurrencies = () => {
    return this.get(this.currency);
  };
  createRates = (data: any) => {
    return this.post(`${this.resource}/create`, data);
  };

  editRates = (data: any) => {
    return this.put(`${this.resource}/${data.rateId}`, data);
  };
  deleteRate = (rateId: any) => {
    return this.delete(`${this.resource}/${rateId}`);
  };
}

const rateTableService = new RateTableService();
export default rateTableService;
