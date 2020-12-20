import axios from 'axios';
export const REACT_APP_ConnectAPI = process.env.REACT_APP_ConnectAPI;

export async function UsersServ_RetrieveAllUsers(): Promise<any | undefined> {
  const allUsers: any | undefined = await axios
    .get(`${REACT_APP_ConnectAPI}/users/allUsers`).then(responseArr => {
      const users: any = responseArr.data;
      return users;
    });
  return allUsers;
}