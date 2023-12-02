export type TUser = {
  selectedItems: any;
  setSelectedItems: any;
  userData: any;
};
export type TUserCreate = {
  first_name: string;
  last_name: string;
  email_id: string;
  book: string;
  enable_rate: number;
  customer_id: string;
  username: string;
  password: string;
  phone_number: number;
  products: any[];
};
export type TUserEdit = {
  first_name: string;
  last_name: string;
  customer_id: string;
  enable_rate: number;
  book: string;
  username: string;
  password: string;
  phone_number: number;
  products: any[];
};
