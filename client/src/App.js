import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import AddCar from "./pages/AddCar";
import AddServices from "./pages/AddServices";
import AdminHome from "./pages/AdminHome";
import AdminService from "./pages/AdminService";
import BookingCar from "./pages/BookingCar";
import BookingServices from "./pages/BookingServices";
import EditCar from "./pages/EditCar";
import EditUser from "./pages/EditUser";

import EditServices from "./pages/EditServices";
import Rent from "./pages/Rent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import UserBookings from "./pages/UserBookings";
import UserServicesBookings from "./pages/UserServicesBookings";

// Antd has been imported for difficult design layout!!!
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Here the paths are made to show on browser taken from pages */}
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/addcar" exact component={AddCar} />
        <ProtectedRoute path="/addservice" exact component={AddServices} />
        <ProtectedRoute path="/admin" exact component={AdminHome} />
        <ProtectedRoute path="/adminService" exact component={AdminService} />
        <ProtectedRoute path="/booking/:carid" exact component={BookingCar} />
        <ProtectedRoute
          path="/bookingService/:serviceid"
          exact
          component={BookingServices}
        />
        <ProtectedRoute path="/editcar/:carid" exact component={EditCar} />
        <ProtectedRoute
          path="/editservice/:serviceid"
          exact
          component={EditServices}
        />
        <ProtectedRoute path="/edituser" exact component={EditUser} />
        <ProtectedRoute path="/rent" exact component={Rent} />
        <ProtectedRoute path="/services" exact component={Services} />
        <ProtectedRoute path="/userbookings" exact component={UserBookings} />
        <ProtectedRoute
          path="/userServicebookings"
          exact
          component={UserServicesBookings}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
}
