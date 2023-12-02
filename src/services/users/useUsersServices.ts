"use client";

import { useQuery, useMutation, UseQueryOptions } from "react-query";
import userService from "./users";
import {
  GET_USERS,
  GET_SINGLE_USER,
  EDIT_USER,
  CREATE_USER,
  DELETE_USER,
  USER_ME,
} from "./constants";
import { TUseMutationOption } from "../types";

function useUsersServices() {
  const useGetUsers = (page: number, options?: UseQueryOptions) =>
    useQuery([GET_USERS, page], () => userService.getUsers(page));
  const useGetSingleUser = (userId: any) =>
    useQuery([GET_SINGLE_USER, userId], () =>
      userService.getSingleUser(userId)
    );
  const useCreateUser = (options?: TUseMutationOption) =>
    useMutation(CREATE_USER, userService.createUser, options);
  const useEditUser = (options?: TUseMutationOption) =>
    useMutation([EDIT_USER], userService.editUser, options);
  const useDeleteUser = (options?: TUseMutationOption) =>
    useMutation(DELETE_USER, userService.deleteUser, options);

    const useDeactivateUser = (options?: TUseMutationOption) =>
    useMutation(DELETE_USER, userService.deactivateUser, options);
  const useUserMe = (options?: TUseMutationOption) =>
    useMutation(USER_ME, userService.getMe, options);
  return {
    useGetUsers,
    useGetSingleUser,
    useCreateUser,
    useEditUser,
    useDeleteUser,
    useDeactivateUser,
    useUserMe
  };
}

export default useUsersServices;
