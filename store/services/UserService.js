import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: () => ({
                url: '/users'
            }),
            providesTags: ['Users']
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        }),
        updateUserFavorites: build.mutation({
            query: ({userId, favorites}) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {favorites}
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const { useUpdateUserFavoritesMutation, useAddUserMutation, useDeleteUserMutation, useFetchAllUsersQuery, useUpdateUserMutation } = userAPI