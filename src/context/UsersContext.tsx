import React, { createContext, useReducer, useEffect } from 'react';
import { IUser } from '../model/IUser';


import { UsersServ_RetrieveAllUsers } from '../services/usersServices';

export interface IUsers {
  users: IUser[];
}

export const initialStateUsers: IUsers = {
  users: [],
}

export enum UsersTyp {
  getAllusers = "getAllusers",
  getAllusersSuccess = "getAllusersSuccess",
}

export type IUsersActionType =
  | { type: UsersTyp.getAllusers }
  | { type: UsersTyp.getAllusersSuccess, users: IUser[] }

const reducerUsers = (state: IUsers = initialStateUsers, action: IUsersActionType): IUsers => {
  switch (action.type) {
    case UsersTyp.getAllusersSuccess:
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}

interface defaultValue {
  state: IUsers;
  dispatch: (action: IUsersActionType) => void;
}

const UsersContext = createContext<defaultValue>({
  state: initialStateUsers,
  dispatch: () => { }
})

const UsersContextProvider = (props: any): JSX.Element => {
  const [UsersState, dispatch] = useReducer(reducerUsers, initialStateUsers);

  const Dispatch = async (action: IUsersActionType) => {
    switch (action.type) {
      case UsersTyp.getAllusers:
        const responseForAll = await UsersServ_RetrieveAllUsers();
        const res: IUser[] | undefined = responseForAll;
        if (res !== undefined) {
          dispatch({ type: UsersTyp.getAllusersSuccess, users: res });
        }
        break;
      default: dispatch(action)
    }
  }

  useEffect(() => {
    Dispatch({ type: UsersTyp.getAllusers })
  }, [])

  return (
    <UsersContext.Provider value={{ state: UsersState, dispatch: Dispatch }}>
      {props.children}
    </UsersContext.Provider>
  )
}


export { UsersContext, UsersContextProvider }