// import { configureStore } from "@reduxjs/toolkit";
// // import counterReducer from "../features/counter/counterSlice";
// import rootReducer from "../reducers";

// export default configureStore({
//   reducer: rootReducer,
// });

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducers from "./reducers";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  think: true,
});

export default configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});
