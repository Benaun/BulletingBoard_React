import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bulletAPI } from "./services/BulletService";
import { userAPI } from "./services/UserService";


const rootReducer = combineReducers({
    [bulletAPI.reducerPath]: bulletAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(userAPI.middleware, bulletAPI.middleware)
    })
}