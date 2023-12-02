import Api from "../api";

class AuthService extends Api {
  resource = "/auth";
  login = "login";
  signUp = "signup";
  signin = (data: any) => {
    return this.post(this.login, data);
  };

  signup = (data: any) => {
    return this.post(this.signUp, data);
  };

  forgotPassword = () => {
    return this.post(this.resource, {});
  };

  reset = () => {
    return this.post(this.resource, {});
  };
}

const authService = new AuthService();
export default authService;
