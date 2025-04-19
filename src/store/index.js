import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import paymentReducer from "./paymentSlice";
import statsReducer from "./statsSlice";
import visitorsReducer from "./visitorsSlice";
import projectsReducer from "./projectsSlice";
import listingsReducer from "./listingsSlice";
import servicesReducer from "./servicesSlice";
import generalSettingsReducer from "./generalSettingsSlice";
import fileUploadReducer from "./fileUploadSlice";
import clientsReducer from "./clientSlice";
import contactReducer from "./contactSlice";
import testimonialsReducer from "./testimonialSlice";

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
    files: fileUploadReducer,
    clients: clientsReducer,
    contacts: contactReducer,
    testimonials: testimonialsReducer,
  },
});

export default store;
