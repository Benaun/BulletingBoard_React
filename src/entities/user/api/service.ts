import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import {
  httpDelete,
  httpGet,
  httpPatch,
  httpPost
} from '@/shared/api/http'

import {
  userSchema,
  usersSchema
} from '@/entities/user/model/schema'

export function useFetchAllUsersQuery() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () =>
      usersSchema.parse(await httpGet('/users'))
  })
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error
  }
}

export function useFetchUserQuery(
  id: string | number | null | undefined
) {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) return null

      // Преобразуем строку в число для правильного API запроса
      const userId =
        typeof id === 'string' ? parseInt(id, 10) : id
      if (isNaN(userId)) return null

      const rawData = await httpGet(`/users/${userId}`)
      return userSchema.parse(rawData)
    },
    enabled:
      !!id &&
      !isNaN(typeof id === 'string' ? parseInt(id, 10) : id)
  })
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error
  }
}

export function useAddUserMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (user: unknown) =>
      userSchema.parse(await httpPost('/users', user)),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['users'] })
  })
  const mut = (user: unknown) => ({
    unwrap: () => mutation.mutateAsync(user)
  })
  return [mut, mutation] as const
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (
      user: { id: number } & Record<string, unknown>
    ) =>
      userSchema.parse(
        await httpPatch(`/users/${user.id}`, user)
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['users'] })
  })
  const mut = (
    user: { id: number } & Record<string, unknown>
  ) => ({
    unwrap: () => mutation.mutateAsync(user)
  })
  return [mut, mutation] as const
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await httpDelete(`/users/${id}`)
      return { id }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['users'] })
  })
  const mut = (id: number) => ({
    unwrap: () => mutation.mutateAsync(id)
  })
  return [mut, mutation] as const
}

export function useUpdateUserFavoritesMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({
      userId,
      favorites
    }: {
      userId: string | number
      favorites: unknown[]
    }) =>
      userSchema.parse(
        await httpPatch(`/users/${userId}`, { favorites })
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['users'] })
  })
  const mut = (args: {
    userId: string | number
    favorites: unknown[]
  }) => ({
    unwrap: () => mutation.mutateAsync(args)
  })
  return [mut, mutation] as const
}
