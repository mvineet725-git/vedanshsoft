import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SolutionsOverviewPage from "./pages/SolutionsOverviewPage";
import SocietyManagementPage from "./pages/SocietyManagementPage";
import EducationManagementPage from "./pages/EducationManagementPage";
import IndustriesPage from "./pages/IndustriesPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import SocietyDemoPage from "./pages/SocietyDemoPage";
import EducationDemoPage from "./pages/EducationDemoPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin pages are split into their own chunk: public visitors (the vast
// majority of traffic on a lead-gen site) never download this code.
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminEnquiriesPage = lazy(() => import("./pages/admin/AdminEnquiriesPage"));
const AdminEnquiryDetailPage = lazy(() => import("./pages/admin/AdminEnquiryDetailPage"));

function AdminFallback() {
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsOverviewPage />} />
          <Route path="/solutions/society-management" element={<SocietyManagementPage />} />
          <Route path="/solutions/education-management" element={<EducationManagementPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/demo/society" element={<SocietyDemoPage />} />
          <Route path="/demo/education" element={<EducationDemoPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />

          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminLoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<AdminFallback />}>
                  <AdminDashboardPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <Suspense fallback={<AdminFallback />}>
                  <AdminEnquiriesPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<AdminFallback />}>
                  <AdminEnquiryDetailPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
