import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import ServicesPage from "../pages/servicesPage";
import AdminLoginPage from "../pages/admin/adminLogin";
import PrivateRoute from "../components/privateComponent";
import AdminDashBoard from "../pages/admin/adminDashboard";
// import AboutUs from "../pages/AboutusPage";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Page404 from "../pages/404Page";
import ProjectPages from "../pages/ProjectPages";
import ListingDetailPage from "../pages/ListingDetailPage";
import ProjectDetailPage from "../pages/ProjectDetailsPage";
import TncPage from "../pages/TncPage";
import PrivacyPage from "../pages/PrivacyPage";
import ShippingPolicyPage from "../pages/ShippingPolicyPage";
import RefundPolicyPage from "../pages/RefundPolicyPage";
import AdminSignupPage from "../pages/admin/adminSignup";
import ListYourProperty from "../pages/ListYourProperty/ListYourProperty";
import Properties from "../pages/Properties/Properties";
import PropertieCategories from "../pages/Properties/PropertieCategories";
import PropertySpecifications from "../components/PropertySpecifications";
import PropertyDetails from "../pages/Properties/PropertyDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/properties" element={<Properties />} />
      <Route
        path="/properties/:slug"
        element={<PropertieCategories />}
      />
      <Route path="/properties/:slug/:variantId" element={<PropertyDetails />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/listyourproperty" element={<ListYourProperty />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/signup" element={<AdminSignupPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashBoard />
          </PrivateRoute>
        }
      />
      <Route path="/tnc" element={<TncPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/shipping" element={<ShippingPolicyPage />} />
      <Route path="/refund" element={<RefundPolicyPage />} />
      <Route path="/projects" element={<ProjectPages />} />
      <Route path="/projects/:id" element={<ListingDetailPage />} />
      <Route path="/projects/p/:id" element={<ProjectDetailPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
