import { configureStore } from "@reduxjs/toolkit";
import reducers from "@src/reducer";
import Reactotron from "../../ReactotronConfig";
import { thunk } from "redux-thunk";

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([thunk]),
  enhancers: getDefaultEnhancers => __DEV__ ? getDefaultEnhancers().concat([(Reactotron as any).createEnhancer()]) : getDefaultEnhancers()
});
