import Api from "../api";

class UserService extends Api {
  resource = "users";
  resource1 = "user";
  resourceMe="me";
  
  getUsers = (page?: number) => {
    return this.get(`${this.resource}?page=${page}`);
  };

  getSingleUser = (userId: number) => {
    return this.get(`${this.resource1}/${userId}`);
  };

  createUser = (data: any) => {
    return this.post(`${this.resource}/create`, data);
  };

  editUser = (data: any) => {
    return this.put(`${this.resource1}/${data.userId}`, data);
  };
  deleteUser = (userId: any) => {
    return this.delete(`${this.resource1}/${userId}`);
  };
  deactivateUser = (data: any) => {
    return this.put(`${this.resource1}/deactivate/${data.userId}`, data);
  };
  getMe = (username?: string) => {
    return this.get(`${this.resourceMe}?username=${username}`);
  };
}

const userService = new UserService();
export default userService;
