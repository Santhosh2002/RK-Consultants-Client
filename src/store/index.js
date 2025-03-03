import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import paymentReducer from "./paymentSlice";
import statsReducer from "./statsSlice";
import visitorsReducer from "./visitorsSlice";
import projectsReducer from "./projectsSlice";
import listingsReducer from "./listingsSlice";
import servicesReducer from "./servicesSlice";
import generalSettingsReducer from "./generalSettingsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
    stats: statsReducer,
    visitors: visitorsReducer,
    projects: projectsReducer,
    listings: listingsReducer,
    services: servicesReducer,
    settings: generalSettingsReducer,
  },
});

export default store;
