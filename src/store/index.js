// eslint-disable-next-line import/no-extraneous-dependencies
// import thunk from 'redux-thunk'
// eslint-disable-next-line import/no-extraneous-dependencies
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistStore, persistReducer } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import taskReducer from './slices/taskSlice'

const rootReducer = combineReducers({
  task: taskReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

});
export const persistor = persistStore(store)