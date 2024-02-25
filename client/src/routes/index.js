import { Route, Routes } from "react-router-dom";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import GuardRoute from "../components/GuardRoute";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles/Vehicles";
import GuardRoleRoute from "../components/GuardRoleRoute";
import VehiclesAdd from "../pages/Vehicles/VehiclesAdd";
import Booking from "../pages/Booking/Booking";
import BookingAdd from "../pages/Booking/BookingAdd";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <GuardRoute>
            <Dashboard />
          </GuardRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <GuardRoute>
            <GuardRoleRoute role={"Admin"}>
              <Vehicles />
            </GuardRoleRoute>
          </GuardRoute>
        }
      />

      <Route
        path="/vehicles/add"
        element={
          <GuardRoute>
            <GuardRoleRoute role={"Admin"}>
              <VehiclesAdd />
            </GuardRoleRoute>
          </GuardRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <GuardRoute>
            <Booking />
          </GuardRoute>
        }
      />

      <Route
        path="/booking/add"
        element={
          <GuardRoute>
            <GuardRoleRoute role={"Admin"}>
              <BookingAdd />
            </GuardRoleRoute>
          </GuardRoute>
        }
      />

      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
