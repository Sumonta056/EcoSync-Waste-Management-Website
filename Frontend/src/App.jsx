import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KJUR } from "jsrsasign";
import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Layout from "./Dashboard/components/shared/Layout.jsx";
import Dashboard from "./Dashboard/pages/Dashboard.jsx";
import UserList from "./Dashboard/pages/User-List/UserList.jsx";
import CreateUser from "./Dashboard/pages/User-Create/CreateUser.jsx";
import AddVehicle from "./Dashboard/pages/AddVehicle/Index.jsx";
import Profile from "./Dashboard/pages/Profile/index.jsx";
import UpdateProfile from "./Dashboard/pages/UpdateProfile/index.jsx";
import AccessRoles from "./Dashboard/pages/Access Roles/index.jsx";
import LandFiill from "./Dashboard/pages/Landfill-Entry/index.jsx";
import CreateSTS from "./Dashboard/pages/CreateSTS/index.jsx";
import STSEntry from "./Dashboard/pages/STS-Entry/index.jsx";
import Transaction from "./Dashboard/pages/Transaction/index.jsx";
import NOACCESS from "./Dashboard/pages/Unauthorized/index.jsx";

function App() {
  const token = localStorage.getItem("access_token");
  let userRole = null;

  if (token) {
    const decodedToken = KJUR.jws.JWS.parse(token);
    userRole = decodedToken.payloadObj?.role;
    console.log(userRole);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Anyone  can access */}
        <Route path="/" element={<Home />} />
        {/* Anyone  can access */}
        <Route path="/login" element={<Login />} />

        {/* Only Logged in can access */}
        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            element={
              userRole === "STS-MANAGER" ||
              userRole === "UNASSIGNED" ||
              userRole === "SYSTEM ADMIN" ||
              userRole === "LANDFILL MANAGER" ? (
                <Dashboard />
              ) : (
                <NOACCESS />
              )
            }
          />
        </Route>

        {/* Only Logged in can access */}
        <Route path="/profile" element={<Layout />}>
          <Route
            index
            element={
              userRole === "STS-MANAGER" ||
              userRole === "UNASSIGNED" ||
              userRole === "SYSTEM ADMIN" ||
              userRole === "LANDFILL MANAGER" ? (
                <Profile />
              ) : (
                <NOACCESS />
              )
            }
          />
        </Route>

        {/* Only Admin can access */}
        <Route path="/userList" element={<Layout />}>
          <Route
            index
            element={userRole === "SYSTEM ADMIN" ? <UserList /> : <NOACCESS />}
          />
        </Route>
        {/* Only Admin can access */}
        <Route path="/createUser">
          <Route
            index
            element={
              userRole === "SYSTEM ADMIN" ? <CreateUser /> : <NOACCESS />
            }
          />
        </Route>
        {/* Only Admin can access */}
        <Route path="/addVehicle" element={<Layout />}>
          <Route
            index
            element={
              userRole === "SYSTEM ADMIN" ? <AddVehicle /> : <NOACCESS />
            }
          />
        </Route>
        {/* Only Admin can access */}
        <Route path="/createSTS" element={<Layout />}>
          <Route
            index
            element={userRole === "SYSTEM ADMIN" ? <CreateSTS /> : <NOACCESS />}
          />
        </Route>

        {/* Only Admin can access */}
        <Route path="/userRoles" element={<Layout />}>
          <Route
            index
            element={
              userRole === "SYSTEM ADMIN" ? <AccessRoles /> : <NOACCESS />
            }
          />
        </Route>

        {/* Only landfil + Admin can access */}
        <Route path="/landfill" element={<Layout />}>
          <Route
            index
            element={
              userRole === "LANDFILL MANAGER" || userRole === "SYSTEM ADMIN" ? (
                <LandFiill />
              ) : (
                <NOACCESS />
              )
            }
          />
        </Route>

        {/* Only STS Manager + Admin can access */}
        <Route path="/sts" element={<Layout />}>
          <Route
            index
            element={
              userRole === "STS-MANAGER" || userRole === "SYSTEM ADMIN" ? (
                <STSEntry />
              ) : (
                <NOACCESS />
              )
            }
          />
        </Route>

        <Route path="/user/:userId" element={<UpdateProfile />} />
        <Route path="/transactions" element={<Layout />}>
          <Route index element={<Transaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
