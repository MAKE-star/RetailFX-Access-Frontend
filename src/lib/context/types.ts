export type IUserInterface = {
  jwt: string;
  user: any;
  setUser: any;
  setJwt: any;
  getMe: any;
};

export type TAuthContext = IUserInterface | null;
