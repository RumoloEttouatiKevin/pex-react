import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense/expense-slice";
import { loggerMiddleware } from "./middlewares/logger-middleware";
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   // whitelist: ['EXPENSE'],
//   // blacklist: [],
// };
// const rootReducers = combineReducers({
//   EXPENSE: expenseSlice.reducer,
// });
// const persistedReducers = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: {
    EXPENSE: expenseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).prepend(loggerMiddleware.middleware),
  // reducer: persistedReducers,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

export { store };

// const persistor = persistStore(store);
// export { store, persistor };
