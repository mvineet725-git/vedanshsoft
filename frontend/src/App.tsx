import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import SolutionsOverviewPage from "./pages/SolutionsOverviewPage";
import SocietyManagementPage from "./pages/SocietyManagementPage";
import EducationManagementPage from "./pages/EducationManagementPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";

// Secondary pages are split into their own chunks: visitors following the
// core conversion path (Home -> Solutions -> Contact/Pricing) never need to
// download these until they actually navigate to them.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const SocietyDemoPage = lazy(() => import("./pages/SocietyDemoPage"));
const EducationDemoPage = lazy(() => import("./pages/EducationDemoPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./pages/TermsOfUsePage"));
const TrustPage = lazy(() => import("./pages/TrustPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Admin pages are split into their own chunk: public visitors (the vast
// majority of traffic on a lead-gen site) never download this code.
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminEnquiriesPage = lazy(() => import("./pages/admin/AdminEnquiriesPage"));
const AdminEnquiryDetailPage = lazy(() => import("./pages/admin/AdminEnquiryDetailPage"));

function PageFallback() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
      <span className="spinner spinner-dark" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/solutions" element={<SolutionsOverviewPage />} />
            <Route path="/solutions/society-management" element={<SocietyManagementPage />} />
            <Route path="/solutions/education-management" element={<EducationManagementPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo/society" element={<SocietyDemoPage />} />
            <Route path="/demo/education" element={<EducationDemoPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/how-we-work" element={<TrustPage />} />
            <Route path="/resources" element={<ResourcesPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <ProtectedRoute>
                  <AdminEnquiriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries/:id"
              element={
                <ProtectedRoute>
                  <AdminEnquiryDetailPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
