import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bulletAPI = createApi({
    reducerPath: 'bulletAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['Bullet'],
    endpoints: (build) => ({
        fetchAllBullets: build.query({
            query: () => ({
                url: '/bullets'
            }),
            providesTags: ['Bullet']
        }),
        createBullet: build.mutation({
            query: (bullet) => ({
                url: '/bullets',
                method: 'POST',
                body: bullet
            }),
            invalidatesTags: ['Bullet']
        }),
        updateBullet: build.mutation({
            query: (bullet) => ({
                url: `/bullets/${bullet.id}`,
                method: 'PATCH',
                body: bullet
            }),
            invalidatesTags: ['Bullet']
        }),
        deleteBullet: build.mutation({
            query: (id) => ({
                url: `/bullets/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bullet']
        })
    })
})

export const {useCreateBulletMutation, useDeleteBulletMutation, useFetchAllBulletsQuery, useUpdateBulletMutation } = bulletAPI