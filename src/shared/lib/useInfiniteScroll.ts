import { useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage: () => void
  threshold?: number
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 200
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (
        target.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  )

  useEffect(() => {
    if (!loadMoreRef.current) return

    observerRef.current = new IntersectionObserver(
      handleObserver,
      {
        threshold: 0.1,
        rootMargin: `${threshold}px`
      }
    )

    observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, threshold])

  // Переподключаем observer при изменении зависимостей
  useEffect(() => {
    if (observerRef.current && loadMoreRef.current) {
      observerRef.current.disconnect()
      observerRef.current.observe(loadMoreRef.current)
    }
  }, [hasNextPage, isFetchingNextPage])

  return { loadMoreRef }
}
