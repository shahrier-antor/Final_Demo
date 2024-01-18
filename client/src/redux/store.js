import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertsReducer } from "./reducers/alertsReducer";
import { carsReducer } from "./reducers/carsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { servicesReducer } from "./reducers/servicesReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { bookingsServiceReducer } from "./reducers/bookingsServicesReducer";

const composeEnhancers = composeWithDevTools({});

// All the reducers are combined togather in rootreducer
const rootReducer = combineReducers({
  alertsReducer,
  carsReducer,
  usersReducer,
  servicesReducer,
  bookingsReducer,
  bookingsServiceReducer,
});

// rootreducer is saved in  store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// the store has advertised
export default store;
