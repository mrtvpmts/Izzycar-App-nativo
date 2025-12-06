
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Dashboard from './screens/client/Dashboard';
import ServiceSelection from './screens/client/ServiceSelection';
import OrderStatus from './screens/client/OrderStatus';
import OrderDetails from './screens/client/OrderDetails';
import Quote from './screens/client/Quote';
import Checklist from './screens/client/Checklist';
import Profile from './screens/client/Profile';
import ManageSubscriptions from './screens/client/ManageSubscriptions';
import ChoosePlan from './screens/client/ChoosePlan';
import Chat from './screens/client/Chat';
import Notifications from './screens/client/Notifications';
import AdminDashboard from './screens/admin/AdminDashboard';
import ShopManagement from './screens/admin/ShopManagement';
import AdminMenu from './screens/admin/AdminMenu';
import InternalChecklist from './screens/employee/InternalChecklist';
import ServicesAvailable from './screens/employee/ServicesAvailable';
import AdminRoute from './components/AdminRoute';


// New Screens
import VehicleList from './screens/client/vehicles/VehicleList';
import VehicleForm from './screens/client/vehicles/VehicleForm';
import SelectVehicle from './screens/client/request/SelectVehicle';
// New Request Flow
import SelectService from './screens/client/request/SelectService';
import SelectConsultant from './screens/client/request/SelectConsultant';
import SelectMechanic from './screens/client/request/SelectMechanic';
import SelectDate from './screens/client/request/SelectDate';
import SchedulingSummary from './screens/client/request/SchedulingSummary';

import ServiceHistory from './screens/client/ServiceHistory';
import Appointments from './screens/client/Appointments';
import PromoDetails from './screens/client/PromoDetails';
import VipMenu from './screens/client/VipMenu';

// Pickup and Delivery Screens
import PickupDeliveryRequest from './screens/client/pickup/PickupDeliveryRequest';
import SelectPickupAddress from './screens/client/pickup/SelectPickupAddress';
import SelectDeliveryAddress from './screens/client/pickup/SelectDeliveryAddress';
import SelectPickupEmployee from './screens/client/pickup/SelectPickupEmployee';
import SelectPickupDateTime from './screens/client/pickup/SelectPickupDateTime';
import PickupDeliverySummary from './screens/client/pickup/PickupDeliverySummary';

// Settings Screens
import PersonalData from './screens/client/settings/PersonalData';
import Addresses from './screens/client/settings/Addresses';
import SecurityPrivacy from './screens/client/settings/SecurityPrivacy';

// Wrapper to handle scroll to top on route change
// Auth Provider
import { AuthProvider } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#121212] text-white font-display overflow-x-hidden max-w-md mx-auto shadow-2xl relative">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />

            {/* Client Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<ServiceSelection />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscriptions" element={<ManageSubscriptions />} />
            <Route path="/choose-plan" element={<ChoosePlan />} />
            <Route path="/vip-menu" element={<VipMenu />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/history" element={<ServiceHistory />} />
            <Route path="/appointments" element={<Appointments />} />

            {/* Vehicle Management */}
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/vehicles/add" element={<VehicleForm />} />
            <Route path="/vehicles/edit/:id" element={<VehicleForm />} />

            {/* Service Request Flow - Full Steps */}
            <Route path="/request/select-vehicle" element={<SelectVehicle />} />
            <Route path="/request/services" element={<SelectService />} />
            <Route path="/request/consultant" element={<SelectConsultant />} />
            <Route path="/request/mechanic" element={<SelectMechanic />} />
            <Route path="/request/date" element={<SelectDate />} />
            <Route path="/request/summary" element={<SchedulingSummary />} />

            {/* Promo Details */}
            <Route path="/promo/:id" element={<PromoDetails />} />

            {/* Pickup and Delivery Flow */}
            <Route path="/pickup/request" element={<PickupDeliveryRequest />} />
            <Route path="/pickup/select-vehicle" element={<SelectVehicle />} />
            <Route path="/pickup/pickup-address" element={<SelectPickupAddress />} />
            <Route path="/pickup/delivery-address" element={<SelectDeliveryAddress />} />
            <Route path="/pickup/employee" element={<SelectPickupEmployee />} />
            <Route path="/pickup/datetime" element={<SelectPickupDateTime />} />
            <Route path="/pickup/summary" element={<PickupDeliverySummary />} />

            {/* Settings Routes */}
            <Route path="/settings/personal-data" element={<PersonalData />} />
            <Route path="/settings/addresses" element={<Addresses />} />
            <Route path="/settings/security" element={<SecurityPrivacy />} />





            {/* Admin/Employee Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminMenu />
              </AdminRoute>
            } />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/shop" element={
              <AdminRoute>
                <ShopManagement />
              </AdminRoute>
            } />
            <Route path="/employee/checklist" element={<InternalChecklist />} />
            <Route path="/employee/services" element={<ServicesAvailable />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
