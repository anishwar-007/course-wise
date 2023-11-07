// store.js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers"; // Combine all your reducers here

const store = createStore(
  rootReducer, // Your combined reducers
  composeWithDevTools(applyMiddleware(/* Add middleware if needed */))
);

export default store;
