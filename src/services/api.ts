import axios from "axios";

export default class Api {
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  get = async (url: string, params?: {}) => {
    return await axios.get(`${this.baseURL}${url}`, { params });
  };
  post = async (url: string, data: any) => {
    return await axios.post(`${this.baseURL}${url}`, data);
  };
  put = async (url: string, data: any) => {
    return await axios.put(`${this.baseURL}${url}`, data);
  };
  delete = async (url: string) => {
    return await axios.delete(`${this.baseURL}${url}`);
  };
}
