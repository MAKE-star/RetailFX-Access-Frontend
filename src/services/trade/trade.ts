import Api from "../api";

export type TradeFilterQuery = {
  status?: 0 | 1 | 2;
  search?: string;
  accNo?: string;
  tradeDate?: string;
  productId?: string;
};

class TradeService extends Api {
  resource = "trades";
  ac = "account-details";
  getTrades = (page?: number) => {
    return this.get(`${this.resource}?page=${page}`);
  };
  getAccountDetails = (accountNumber: string) => {
    return this.get(`${this.ac}/${accountNumber}`);
  };

  getSingleTrade = (tradesId: any) => {
    return this.get(`${this.resource}/${tradesId}`);
  };
  filterTrades = (filters: TradeFilterQuery, page: number = 1) => {
    return this.get("filter", { ...filters, page });
  };

  createTrade = (data: any) => {
    return this.post(`${this.resource}/create`, data);
  };
  editTrade = (data: any) => {
    return this.put(`${this.resource}/edit/update/${data.tradesId}`, data);
  };
  deleteTrade = (tradesId: any) => {
    return this.delete(`${this.resource}/edit/delete/${tradesId}`);
  };
}
const tradeService = new TradeService();
export default tradeService;
