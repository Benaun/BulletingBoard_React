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
  bulletSchema,
  bulletsSchema
} from '@/entities/bullet/model/schema'

export function useFetchAllBulletsQuery() {
  const query = useQuery({
    queryKey: ['bullets'],
    queryFn: async () =>
      bulletsSchema.parse(await httpGet('/bullets'))
  })
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error
  }
}

export function useCreateBulletMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (bullet: unknown) =>
      bulletSchema.parse(await httpPost('/bullets', bullet)),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['bullets'] })
  })
  const mutateWithUnwrap = (bullet: unknown) => ({
    unwrap: () => mutation.mutateAsync(bullet)
  })
  return [mutateWithUnwrap, mutation] as const
}

export function useUpdateBulletMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (
      bullet: {
        id: number
      } & import('@/entities/bullet/model/schema').Bullet
    ) =>
      bulletSchema.parse(
        await httpPatch(`/bullets/${bullet.id}`, bullet)
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['bullets'] })
  })
  const mutateWithUnwrap = (
    bullet: {
      id: number
    } & import('@/entities/bullet/model/schema').Bullet
  ) => ({ unwrap: () => mutation.mutateAsync(bullet) })
  return [mutateWithUnwrap, mutation] as const
}

export function useDeleteBulletMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await httpDelete(`/bullets/${id}`)
      return { id }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['bullets'] })
  })
  const mutateWithUnwrap = (id: number) => ({
    unwrap: () => mutation.mutateAsync(id)
  })
  return [mutateWithUnwrap, mutation] as const
}
