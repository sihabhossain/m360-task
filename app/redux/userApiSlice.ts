// userApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    createUser: builder.mutation({
      query: (newUserData) => ({
        url: "/users",
        method: "POST",
        body: newUserData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/resource/${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUserData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedUserData,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = apiSlice;

export default apiSlice;
