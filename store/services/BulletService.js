// React Query wrappers preserving RTK Query-like API
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { httpDelete, httpGet, httpPatch, httpPost } from '@/shared/api/http'
import { bulletsSchema, bulletSchema } from '@/entities/bullet/model/schema'

export function useFetchAllBulletsQuery() {
    const query = useQuery({
        queryKey: ['bullets'],
        queryFn: async () => {
            const data = await httpGet('/bullets');
            return bulletsSchema.parse(data);
        },
    });
    return { data: query.data, isLoading: query.isLoading, error: query.error };
}

export function useCreateBulletMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (bullet) => {
            const data = await httpPost('/bullets', bullet);
            return bulletSchema.parse(data);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bullets'] }),
    });
    const mutateWithUnwrap = (bullet) => ({ unwrap: () => mutation.mutateAsync(bullet) });
    return [mutateWithUnwrap, mutation];
}

export function useUpdateBulletMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (bullet) => {
            const data = await httpPatch(`/bullets/${bullet.id}`, bullet);
            return bulletSchema.parse(data);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bullets'] }),
    });
    const mutateWithUnwrap = (bullet) => ({ unwrap: () => mutation.mutateAsync(bullet) });
    return [mutateWithUnwrap, mutation];
}

export function useDeleteBulletMutation() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id) => {
            await httpDelete(`/bullets/${id}`);
            return { id };
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bullets'] }),
    });
    const mutateWithUnwrap = (id) => ({ unwrap: () => mutation.mutateAsync(id) });
    return [mutateWithUnwrap, mutation];
}

export const bulletAPI = { useFetchAllBulletsQuery };