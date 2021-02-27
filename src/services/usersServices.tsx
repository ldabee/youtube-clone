import axios from 'axios';
import { IUser } from '../model/IUser';
export const REACT_APP_ConnectAPI = process.env.REACT_APP_ConnectAPI;

export async function UsersServ_RetrieveAllUsers(): Promise<IUser[] | undefined> {
  const allUsers: IUser[] | undefined = await axios
    .get(`/users/allUsers`).then(responseArr => {
      const users: IUser[] = responseArr.data;
      return users;
    });
  return allUsers;
}