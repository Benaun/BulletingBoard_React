// React Query wrappers preserving RTK Query-like API
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { httpDelete, httpGet, httpPatch, httpPost } from '@/shared/api/http'
import { usersSchema, userSchema } from '@/entities/user/model/schema'

export function useFetchAllUsersQuery() {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await httpGet('/users');
            return usersSchema.parse(data);
        },
    });
    return { data: query.data, isLoading: query.isLoading, error: query.error };
}

export function useAddUserMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (user) => userSchema.parse(await httpPost('/users', user)),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
    const mut = (user) => ({ unwrap: () => mutation.mutateAsync(user) });
    return [mut, mutation];
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (user) => userSchema.parse(await httpPatch(`/users/${user.id}`, user)),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
    const mut = (user) => ({ unwrap: () => mutation.mutateAsync(user) });
    return [mut, mutation];
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id) => {
            await httpDelete(`/users/${id}`);
            return { id };
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
    const mut = (id) => ({ unwrap: () => mutation.mutateAsync(id) });
    return [mut, mutation];
}

export function useUpdateUserFavoritesMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ userId, favorites }) => userSchema.parse(await httpPatch(`/users/${userId}`, { favorites })),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
    const mut = (args) => ({ unwrap: () => mutation.mutateAsync(args) });
    return [mut, mutation];
}

export const userAPI = { useFetchAllUsersQuery };