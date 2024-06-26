//malaka
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PrivateRouteTourist from "./components/PrivateRouteTourist";
import PrivateRouteSeller from "./components/PrivateRouteSeller";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AddItems from "./pages/AddItems";
import Layout from "./components/headers/Layout";
import Footer from "./components/Footer";
import EventTable from "./components/eventAct/EventTable";
import ProfileS from "./pages/ProfileS";
import Admin from "./pages/Admin";
import ProfileAd from "./pages/ProfileAd";
import CreatePkg from "./pages/tourPkg/CreatePkg";
import ListedItems from "./pages/ListedItems";
import UpdatePkg from "./pages/tourPkg/UpdatePkg";
import Packages from "./pages/tourPkg/Packages";
import SearchPkg from "./pages/tourPkg/SearchPkg";
import SignUpN from "./pages/SignUpN";
import { AdminUM } from "./components/user/AdminUM";
import AdminUserInfo from "./components/user/AdminUserInfo";
import ProfileView from "./pages/ProfileView";
import AdminAddUser from "./components/user/AdminAddUser";
import AdminPM from "./components/tour-packages/AdminPM";
import AdminPackageUpdate from "./components/tour-packages/AdminPackageUpdate";
import AdminAddPkg from "./components/tour-packages/AdminAddPkg";

//dewni
import CreateEvent from "./pages/eventAct/CreateEvent";
import ShowEvent from "./pages/eventAct/ShowEvent";
import UpdateEvent from "./pages/eventAct/UpdateEvent";
import DeleteEvent from "./pages/eventAct/DeleteEvent";
import SearchEvent from "./pages/eventAct/SearchEvent";
import AdminAddEvent from "./components/eventAct/AdminAddEvent";
import AdminUpdateEvent from "./components/eventAct/AdminUpdateEvent";
import EventCalendarPage from "./components/eventAct/EventCalendar";

//wikasith
import Vehicle from "./pages/VehicleManagement/Vehicle";
import AddVehicle from "./pages/VehicleManagement/AddVehicle";
import DeleteVehicle from "./pages/VehicleManagement/Vehicle";
import ShowVehicle from "./pages/VehicleManagement/ShowVehicle";
import EditVehicle from "./pages/VehicleManagement/EditVehicle";
import VehicleHome from "./pages/VehicleManagement/VehicleHome";
import VehicleAdmin from "./pages/VehicleManagement/AdminVM";
import VehicleBook from "./pages/VehicleManagement/VehicleBook";
import AdminVehicleAdd from "./components/VehicleManagement/AdminVehicleAdd";
import AdminVehicleUpdate from "./components/VehicleManagement/AdminVehicleUpdate";

//sasindu
import CreateHotel from "./pages/hotel/CreateHotel";
import Hotel from "./pages/hotel/Hotel";
import SearchHotel from "./pages/hotel/SearchHotel";
import UpdateHotel from "./pages/hotel/UpdateHotel";
import AdminHM from "./components/hotel/AdminHm";
import AdminHotelUpdate from "./components/hotel/AdminHotelUpdate";
import AdminAddHotel from "./components/hotel/AdminAddHotel";

//shadini
import CreateTrain from "./pages/train/CreateTrain";
import { AdminTrainManagement } from "./components/train/AdminTrainManagement";
import UpdateTrain from "./pages/train/UpdateTrain";
import AdminAddTrain from "./components/train/AdminAddTrain";
import AdminTrainUpdate from "./components/train/AdminTrainUpdate";
import TrainHome from "./pages/train/TrainHome";
import TrainBook from "./pages/train/TrainBook";

//prabodhi
import Add_Guide from "./pages/tourGuid/Add_Guide";
import UpdateGuide from "./pages/tourGuid/UpdateGuide";
import Guides from "./pages/tourGuid/Guides";
import SearchGuid from "./pages/tourGuid/SearchGuid";
import AdminGM from "./components/tourGuid/AdminGM";
import AdminAddGuid from "./components/tourGuid/AdminAddGuid";
import AdminGuidUpdate from "./components/tourGuid/AdminGuidUpdate";

//mithun
import Restaurant from "./pages/restaurants/Restaurants";
import ResPackages from "./pages/restaurants/Packages";
import Dashboard from "./pages/restaurants/Dashboard";
import CreateRestaurant from "./pages/restaurants/CreateRestaurant";
import UpdateRestaurant from "./pages/restaurants/UpdateRestaurant";
import CreatePackage from "./pages/restaurants/CreatePackage";
import UpdatePackage from "./pages/restaurants/UpdatePackage";
import Booking from "./pages/restaurants/Booking";
import PackageCard from "./components/tour-packages/PackageCard";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignUpN />} />
        <Route path="/sign-up" element={<SignUpN />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages/:packageId" element={<Packages />} />
        <Route path="/package-search" element={<SearchPkg />} />

        <Route element={<PrivateRouteTourist />}>
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/profile-update" element={<Profile />} />
          <Route path="/train/book/:id" element={<TrainBook />} />
        </Route>

        <Route element={<PrivateRouteSeller />}>
          <Route path="/additems" element={<AddItems />} />
          <Route path="/seller/profile" element={<ProfileView />} />
          <Route path="/seller/profile-update" element={<ProfileS />} />
          <Route path="/seller/create-package" element={<CreatePkg />} />
          <Route path="/update-package/:packageId" element={<UpdatePkg />} />
          <Route path="/my-packages/:packageId" element={<Packages />} />
          <Route path="/my-items" element={<ListedItems />} />
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin/dashbard" element={<Admin />} />
          <Route path="/admin/user" element={<AdminUM />} />
          <Route path="/admin/user/add" element={<AdminAddUser />} />
          <Route path="/admin/user/:id" element={<AdminUserInfo />} />
          <Route path="/admin/profile" element={<ProfileView />} />
          <Route path="/admin/profile-update" element={<ProfileAd />} />
          <Route path="/admin/packages" element={<AdminPM />} />
          <Route
            path="/admin/packages/update/:packageId"
            element={<AdminPackageUpdate />}
          />
          <Route path="/admin/packages/:packageId" element={<Packages />} />
          <Route path="/admin/packages/add-pkg" element={<AdminAddPkg />} />
        </Route>

        {/*Wikasith*/}
        <Route path="/Vehicle" element={<Vehicle />} />
        <Route path="/Vehicle/add" element={<AddVehicle />} />
        <Route path="/Vehicle/delete/:id" element={<DeleteVehicle />} />
        <Route path="/Vehicle/update/:id" element={<EditVehicle />} />
        <Route path="/VehicleHome" element={<VehicleHome />} />
        <Route path="/Vehicle/get/:id" element={<ShowVehicle />} />
        <Route path="/Vehicle/book/:id" element={<VehicleBook />} />

        <Route path="/Admin/Vehicle" element={<VehicleAdmin />} />
        <Route path="/Admin/Vehicle/get/:id" element={<ShowVehicle />} />
        <Route path="/admin/vehicle/add" element={<AdminVehicleAdd />} />
        <Route
          path="/admin/vehicle/update/:id"
          element={<AdminVehicleUpdate />}
        />

        {/*Dewni*/}
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/details/:id" element={<ShowEvent />} />
        <Route path="/events/update/:id" element={<UpdateEvent />} />
        <Route path="/events/delete/:id" element={<DeleteEvent />} />
        <Route path="/events/get/:id" element={<ShowEvent />} />
        <Route path="/events/search/" element={<SearchEvent />} />
        <Route path="/event/get/:id" element={<ShowEvent />} />
        <Route path="/seller/event/get/:id" element={<ShowEvent />} />

        <Route path="/events/calendar" element={<EventCalendarPage />} />

        <Route path="/admin/events" element={<EventTable />} />
        <Route path="/admin/events/get/:id" element={<ShowEvent />} />
        <Route path="/admin/add-event" element={<AdminAddEvent />} />
        <Route path="/admin/evt-update/:id" element={<AdminUpdateEvent />} />

        {/*Sasindu*/}
        <Route path="/create-hotel" element={<CreateHotel />} />
        <Route path="/Hotel/:hotelId" element={<Hotel />} />
        <Route path="/hotel-search" element={<SearchHotel />} />
        <Route path="/my-hotels/:hotelId" element={<Hotel />} />
        <Route path="/admin/hotels" element={<AdminHM />} />
        <Route
          path="/admin/hotels/update/:hotelId"
          element={<AdminHotelUpdate />}
        />
        <Route path="/admin/hotels/:hotelId" element={<Hotel />} />
        <Route path="/admin/hotels/add-hotel" element={<AdminAddHotel />} />
        <Route path="/update-hotel/:hotelId" element={<UpdateHotel />} />

        {/*Shadini*/}
        <Route path="/add-train" element={<CreateTrain />} />
        <Route path="/update-train/:trainID" element={<UpdateTrain />} />
        <Route path="/admin/train" element={<AdminTrainManagement />} />
        <Route path="/admin/train/add" element={<AdminAddTrain />} />
        <Route
          path="/admin/train/update/:trainID"
          element={<AdminTrainUpdate />}
        />
        <Route path="/train/search" element={<TrainHome />} />
        

        {/* prabodhi */}
        <Route path="/add-guide" element={<Add_Guide />}></Route>
        <Route
          path="/update-guide/:guidingId"
          element={<UpdateGuide />}
        ></Route>
        <Route path="/guiding/:guidingId" element={<Guides />}></Route>
        <Route path="/guid/search" element={<SearchGuid />} />
        <Route path="/admin/guid" element={<AdminGM />} />
        <Route path="/admin/guid/add" element={<AdminAddGuid />} />
        <Route path="/admin/guid/:guidingId" element={<Guides />} />
        <Route
          path="/admin/guid/update/:guidingId"
          element={<AdminGuidUpdate />}
        />

        {/* mithun */}
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/res-pkg" element={<ResPackages />} />
        <Route path="/admin/res-dash" element={<Dashboard />} />
        <Route path="/admin/create-res" element={<CreateRestaurant />} />
        <Route path="/admin/update-res/:id" element={<UpdateRestaurant />} />
        <Route path="/admin/create-res-pkg" element={<CreatePackage />} />
        <Route path="/admin/update-res-pkg/:id" element={<UpdatePackage />} />
        <Route path="/res-pkg-book/:id" element={<Booking />} />
        

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
