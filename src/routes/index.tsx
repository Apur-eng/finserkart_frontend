import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import AgentLayout from '../layouts/AgentLayout';
import CALayout from '../layouts/CALayout';
import { FranchiseLayout } from '../layouts/FranchiseLayout';
import { CoordinatorLayout } from '../layouts/CoordinatorLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Module 01: Public Website Pages
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import RegisterPage from '../pages/RegisterPage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import ServicesPage from '../pages/ServicesPage';
import TermsPage from '../pages/TermsPage';

// Module 02: Customer Portal Pages
import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage';
import CustomerApplicationsPage from '../pages/customer/CustomerApplicationsPage';
import NewApplicationPage from '../pages/customer/NewApplicationPage';
import ApplicationDetailsPage from '../pages/customer/ApplicationDetailsPage';
import ApplicationTrackerPage from '../pages/customer/ApplicationTrackerPage';
import DocumentCentrePage from '../pages/customer/DocumentCentrePage';
import DocumentUploadPage from '../pages/customer/DocumentUploadPage';
import CustomerConversationsPage from '../pages/customer/CustomerConversationsPage';
import CustomerPaymentsPage from '../pages/customer/CustomerPaymentsPage';
import CustomerProfilePage from '../pages/customer/CustomerProfilePage';
import CustomerNotificationsPage from '../pages/customer/CustomerNotificationsPage';
import CustomerSupportPage from '../pages/customer/CustomerSupportPage';

// Module 03: Agent Portal Pages
import AgentDashboardPage from '../pages/agent/AgentDashboardPage';
import AgentOnboardCustomerPage from '../pages/agent/AgentOnboardCustomerPage';
import AgentCustomerDirectoryPage from '../pages/agent/AgentCustomerDirectoryPage';
import AgentApplicationsPage from '../pages/agent/AgentApplicationsPage';
import AgentApplicationDetailsPage from '../pages/agent/AgentApplicationDetailsPage';
import AgentCommissionsPage from '../pages/agent/AgentCommissionsPage';
import AgentPayoutsPage from '../pages/agent/AgentPayoutsPage';
import AgentProfilePage from '../pages/agent/AgentProfilePage';
import AgentNotificationsPage from '../pages/agent/AgentNotificationsPage';

// Module 04: CA Portal Pages
import CADashboardPage from '../pages/ca/CADashboardPage';
import CAAssignedApplicationsPage from '../pages/ca/CAAssignedApplicationsPage';
import CAApplicationDetailsPage from '../pages/ca/CAApplicationDetailsPage';
import CAWorkflowPage from '../pages/ca/CAWorkflowPage';
import CADocumentReviewPage from '../pages/ca/CADocumentReviewPage';
import CAConversationsPage from '../pages/ca/CAConversationsPage';
import CADeliverablesPage from '../pages/ca/CADeliverablesPage';
import CACompletedApplicationsPage from '../pages/ca/CACompletedApplicationsPage';
import CAProfilePage from '../pages/ca/CAProfilePage';
import CANotificationsPage from '../pages/ca/CANotificationsPage';

// Module 05: Franchise Portal Pages
import { FranchiseDashboardPage } from '../pages/franchise/FranchiseDashboardPage';
import { FranchiseAgentsPage } from '../pages/franchise/FranchiseAgentsPage';
import { FranchiseCustomersPage } from '../pages/franchise/FranchiseCustomersPage';
import { FranchiseApplicationsPage } from '../pages/franchise/FranchiseApplicationsPage';
import { FranchiseCommissionsPage } from '../pages/franchise/FranchiseCommissionsPage';
import { FranchisePayoutsPage } from '../pages/franchise/FranchisePayoutsPage';
import { FranchiseReportsPage } from '../pages/franchise/FranchiseReportsPage';
import { FranchiseProfilePage } from '../pages/franchise/FranchiseProfilePage';

// Module 06: Operations Coordinator Portal Pages
import { CoordinatorDashboardPage } from '../pages/coordinator/CoordinatorDashboardPage';
import { CoordinatorApplicationsPage } from '../pages/coordinator/CoordinatorApplicationsPage';
import { CoordinatorApplicationDetailsPage } from '../pages/coordinator/CoordinatorApplicationDetailsPage';
import { CoordinatorCAAssignmentPage } from '../pages/coordinator/CoordinatorCAAssignmentPage';
import { CoordinatorCAManagementPage } from '../pages/coordinator/CoordinatorCAManagementPage';
import { CoordinatorDocumentMonitoringPage } from '../pages/coordinator/CoordinatorDocumentMonitoringPage';
import { CoordinatorTransactionsPage } from '../pages/coordinator/CoordinatorTransactionsPage';
import { CoordinatorNotificationsPage } from '../pages/coordinator/CoordinatorNotificationsPage';

// Module 07: Central Admin Portal Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminUserManagementPage } from '../pages/admin/AdminUserManagementPage';
import { AdminApplicationsPage } from '../pages/admin/AdminApplicationsPage';
import { AdminCAManagementPage } from '../pages/admin/AdminCAManagementPage';
import { AdminCommissionManagementPage } from '../pages/admin/AdminCommissionManagementPage';
import { AdminServiceCataloguePage } from '../pages/admin/AdminServiceCataloguePage';
import { AdminFinancialReportsPage } from '../pages/admin/AdminFinancialReportsPage';
import { AdminSupportPage } from '../pages/admin/AdminSupportPage';
import { AdminActivityLogsPage } from '../pages/admin/AdminActivityLogsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminProfilePage } from '../pages/admin/AdminProfilePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Module 01: Public Website Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Module 02: Customer Portal Routes */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboardPage />} />
        <Route path="dashboard" element={<CustomerDashboardPage />} />
        <Route path="applications" element={<CustomerApplicationsPage />} />
        <Route path="applications/new" element={<NewApplicationPage />} />
        <Route path="applications/:id" element={<ApplicationDetailsPage />} />
        <Route path="applications/:id/tracker" element={<ApplicationTrackerPage />} />
        <Route path="documents" element={<DocumentCentrePage />} />
        <Route path="documents/upload" element={<DocumentUploadPage />} />
        <Route path="conversations" element={<CustomerConversationsPage />} />
        <Route path="payments" element={<CustomerPaymentsPage />} />
        <Route path="profile" element={<CustomerProfilePage />} />
        <Route path="notifications" element={<CustomerNotificationsPage />} />
        <Route path="support" element={<CustomerSupportPage />} />
      </Route>

      {/* Module 03: Agent Portal Routes */}
      <Route path="/agent" element={<AgentLayout />}>
        <Route index element={<AgentDashboardPage />} />
        <Route path="dashboard" element={<AgentDashboardPage />} />
        <Route path="customers/onboard" element={<AgentOnboardCustomerPage />} />
        <Route path="customers" element={<AgentCustomerDirectoryPage />} />
        <Route path="applications" element={<AgentApplicationsPage />} />
        <Route path="applications/:id" element={<AgentApplicationDetailsPage />} />
        <Route path="commissions" element={<AgentCommissionsPage />} />
        <Route path="payouts" element={<AgentPayoutsPage />} />
        <Route path="profile" element={<AgentProfilePage />} />
        <Route path="notifications" element={<AgentNotificationsPage />} />
      </Route>

      {/* Module 04: CA Portal Routes */}
      <Route path="/ca" element={<CALayout />}>
        <Route index element={<CADashboardPage />} />
        <Route path="dashboard" element={<CADashboardPage />} />
        <Route path="applications" element={<CAAssignedApplicationsPage />} />
        <Route path="applications/:id" element={<CAApplicationDetailsPage />} />
        <Route path="applications/:id/workflow" element={<CAWorkflowPage />} />
        <Route path="documents" element={<CADocumentReviewPage />} />
        <Route path="conversations" element={<CAConversationsPage />} />
        <Route path="deliverables" element={<CADeliverablesPage />} />
        <Route path="completed" element={<CACompletedApplicationsPage />} />
        <Route path="profile" element={<CAProfilePage />} />
        <Route path="notifications" element={<CANotificationsPage />} />
      </Route>

      {/* Module 05: Franchise Portal Routes */}
      <Route path="/franchise" element={<FranchiseLayout />}>
        <Route index element={<FranchiseDashboardPage />} />
        <Route path="dashboard" element={<FranchiseDashboardPage />} />
        <Route path="agents" element={<FranchiseAgentsPage />} />
        <Route path="customers" element={<FranchiseCustomersPage />} />
        <Route path="applications" element={<FranchiseApplicationsPage />} />
        <Route path="commissions" element={<FranchiseCommissionsPage />} />
        <Route path="payouts" element={<FranchisePayoutsPage />} />
        <Route path="reports" element={<FranchiseReportsPage />} />
        <Route path="profile" element={<FranchiseProfilePage />} />
      </Route>

      {/* Module 06: Operations Coordinator Portal Routes */}
      <Route path="/coordinator" element={<CoordinatorLayout />}>
        <Route index element={<CoordinatorDashboardPage />} />
        <Route path="dashboard" element={<CoordinatorDashboardPage />} />
        <Route path="applications" element={<CoordinatorApplicationsPage />} />
        <Route path="applications/:id" element={<CoordinatorApplicationDetailsPage />} />
        <Route path="ca-assignment" element={<CoordinatorCAAssignmentPage />} />
        <Route path="cas" element={<CoordinatorCAManagementPage />} />
        <Route path="documents" element={<CoordinatorDocumentMonitoringPage />} />
        <Route path="transactions" element={<CoordinatorTransactionsPage />} />
        <Route path="notifications" element={<CoordinatorNotificationsPage />} />
      </Route>

      {/* Module 07: Central Admin Portal Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUserManagementPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="cas" element={<AdminCAManagementPage />} />
        <Route path="commissions" element={<AdminCommissionManagementPage />} />
        <Route path="services" element={<AdminServiceCataloguePage />} />
        <Route path="finances" element={<AdminFinancialReportsPage />} />
        <Route path="support" element={<AdminSupportPage />} />
        <Route path="activity" element={<AdminActivityLogsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
