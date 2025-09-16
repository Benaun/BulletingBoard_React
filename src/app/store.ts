import { configureStore } from '@reduxjs/toolkit'

export function setupStore() {
    return configureStore({
        reducer: {},
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = ReturnType<AppStore['dispatch']>

