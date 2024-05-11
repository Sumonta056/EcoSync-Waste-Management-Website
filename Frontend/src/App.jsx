import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KJUR } from "jsrsasign";
import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Layout from "./Dashboard/components/shared/Layout.jsx";
import Dashboard from "./Dashboard/pages/Dashboard.jsx";
import ContractorDashboard from "./Dashboard/pages/ContractorDashboard.jsx";
import UserList from "./Dashboard/pages/User-List/UserList.jsx";
import CreateUser from "./Dashboard/pages/User-Create/CreateUser.jsx";
import AddVehicle from "./Dashboard/pages/AddVehicle/Index.jsx";
import Profile from "./Dashboard/pages/Profile/index.jsx";
import UpdateProfile from "./Dashboard/pages/UpdateProfile/index.jsx";
import AccessRoles from "./Dashboard/pages/Access Roles/index.jsx";
import LandFillEntry from "./Dashboard/pages/Landfill-Entry/index.jsx";
import CreateLandfill from "./Dashboard/pages/CreateLandfill/index.jsx";
import CreateContract from "./Dashboard/pages/CreateContractor/index.jsx";
import STSLoadEntry from "./Dashboard/pages/STS-LoadEntry/index.jsx";
import CreateSTS from "./Dashboard/pages/CreateSTS/index.jsx";
import CreateContractor from "./Dashboard/pages/CreateContractor/index.jsx";
import CreateEmployee from "./Dashboard/pages/CreateEmployee/index.jsx";
import FirstTransferEntry from "./Dashboard/pages/ThirdParty-Entry/index.jsx";
import HomeCollectionEntry from "./Dashboard/pages/HomeCollection-Entry/index.jsx";
import STSEntry from "./Dashboard/pages/STS-Entry/index.jsx";
import STSHistory from "./Dashboard/pages/STS-Entry/history.jsx";
import ContractorHistory from "./Dashboard/pages/Contractor-Entry/history.jsx";
import Transaction from "./Dashboard/pages/Transaction/index.jsx";
import NOACCESS from "./Dashboard/pages/Unauthorized/index.jsx";
import Map from "./Dashboard/pages/RouteOptimize/index.jsx";
import DumpHistory from "./Dashboard/pages/Landfill-Entry/history.jsx";
import ScheduleHistory from "./Dashboard/pages/Schedule-Entry/history.jsx";
import ForgetPass1 from "./Forget-Pass/Forget-pass1.jsx";
import ForgetPass2 from "./Forget-Pass/Forget-pass2.jsx";
import ForgetPass3 from "./Forget-Pass/Forget-pass3.jsx";
import About from "./Dashboard/pages/About/index.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const token = localStorage.getItem("access_token");
  let userRole = null;

  if (token) {
    const decodedToken = KJUR.jws.JWS.parse(token);
    userRole = decodedToken.payloadObj?.role;
    console.log(userRole);
  }

  const [dashboard, setDashboard] = useState(false);
  const [userListAccess, setUserListAccess] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [createSTS, setCreateSTS] = useState(false);
  const [createLandfill, setCreateLandfill] = useState(false);
  const [createContract, setCreateContract] = useState(true);
  const [stsEntry, setStsEntry] = useState(false);
  const [stsLoadEntry, setSTSLoadEntry] = useState(true);
  const [landfillEntry, setLandfillEntry] = useState(false);
  const [seeDumpHistory, setSeeDumpHistory] = useState(false);
  const [accessRoles, setAccessRoles] = useState(false);
  const [profile, setProfile] = useState(false);
  const [seeTransferHistory, setSeeTransferHistory] = useState(false);
  const [seeOptimizeRoute, setSeeOptimizeRoute] = useState(false);
  const [addVehicleEntry, setAddVehicleEntry] = useState(false);
  const [CreateEmployees, setCreateEmployee] = useState(false);

  useEffect(() => {
    if (userRole) {
      axios
        .get(
          `http://localhost:3000/rbac/check/${encodeURIComponent(
            userRole
          )}/permissions`
        )
        .then((response) => {
          response.data.forEach((permission) => {
            switch (permission.permissionName) {
              case "Dashboard":
                setDashboard(permission.status);
                break;
              case "User-List-Access":
                setUserListAccess(permission.status);
                break;
              case "Show-Transaction":
                setShowTransaction(permission.status);
                break;
              case "Create-STS":
                setCreateSTS(permission.status);
                break;
              case "Create-Landfill":
                setCreateLandfill(permission.status);
                break;
              case "Create-Contract":
                setCreateContract(permission.status);
                break;
              case "STS-Entry":
                setStsEntry(permission.status);
                break;
              case "Landfill-Entry":
                setLandfillEntry(permission.status);
                break;
              case "See-Dump-History":
                setSeeDumpHistory(permission.status);
                break;
              case "Access-Roles":
                setAccessRoles(permission.status);
                break;
              case "Profile":
                setProfile(permission.status);
                break;
              case "See-Transfer-History":
                setSeeTransferHistory(permission.status);
                break;
              case "See-Optimize-Route":
                setSeeOptimizeRoute(permission.status);
                break;
              case "Add-Vehicle-Entry":
                setAddVehicleEntry(permission.status);
                break;

              case "Registration-Employee":
                setCreateEmployee(permission.status);
                break;

              case "STS-Load-Entry":
                setSTSLoadEntry(permission.status);
                break;
              default:
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching permissions:", error);
        });
    }
  }, [userRole]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Anyone  can access */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/reset-password/initiate" element={<ForgetPass1 />} />
        <Route path="/auth/reset-password/confirm" element={<ForgetPass2 />} />
        <Route path="/auth/change-password" element={<ForgetPass3 />} />
        {/* Anyone  can access */}

        {/* Only any Logged in can access */}
        
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={dashboard ? <Dashboard /> : <NOACCESS />} />
        </Route>
        <Route path="/contractordashboard" element={<Layout />}>
          <Route index element={ContractorDashboard ? <ContractorDashboard /> : <NOACCESS />} />
        </Route>
        <Route path="/profile" element={<Layout />}>
          <Route index element={profile ? <Profile /> : <NOACCESS />} />
        </Route>
        <Route path="/contract" element={<Layout />}>
          <Route
            index
            element={createContract ? <CreateContract /> : <NOACCESS />}
          />
        </Route>
        <Route path="/stsLoad" element={<Layout />}>
          <Route
            index
            element={stsLoadEntry ? <STSLoadEntry /> : <NOACCESS />}
          />
        </Route>
        {/* Only any Logged in can access */}

        {/* Only Admin can access */}
        <Route path="/userList" element={<Layout />}>
          <Route index element={userListAccess ? <UserList /> : <NOACCESS />} />
        </Route>
        <Route path="/createUser">
          <Route
            index
            element={
              userRole === "SYSTEM ADMIN" ? <CreateUser /> : <NOACCESS />
            }
          />
        </Route>
        <Route path="/addVehicle" element={<Layout />}>
          <Route
            index
            element={addVehicleEntry ? <AddVehicle /> : <NOACCESS />}
          />
        </Route>
        <Route path="/createSTS" element={<Layout />}>
          <Route index element={createSTS ? <CreateSTS /> : <NOACCESS />} />
        </Route>
        <Route path="/createEmployee" element={<Layout />}>
          <Route
            index
            element={CreateEmployees ? <CreateEmployee /> : <NOACCESS />}
          />
        </Route>
        <Route path="/createLandfill" element={<Layout />}>
          <Route
            index
            element={createLandfill ? <CreateLandfill /> : <NOACCESS />}
          />
        </Route>

        <Route path="/userRoles" element={<Layout />}>
          <Route index element={accessRoles ? <AccessRoles /> : <NOACCESS />} />
        </Route>
        {/* Only Admin can access */}

        {/* Only landfil + Admin can access */}
        <Route path="/landfill" element={<Layout />}>
          <Route
            index
            element={landfillEntry ? <LandFillEntry /> : <NOACCESS />}
          />
        </Route>
        <Route path="/dumpHistory" element={<Layout />}>
          <Route
            index
            element={seeDumpHistory ? <DumpHistory /> : <NOACCESS />}
          />
        </Route>
        <Route path="/scheduleHistory" element={<Layout />}>
          <Route
            index
            element={ScheduleHistory ? <ScheduleHistory /> : <NOACCESS />}
          />
        </Route>
        {/* Only landfil + Admin can access */}

        {/* Only STS Manager + Admin can access */}
        <Route path="/firsttransfer" element={<Layout />}>
          <Route
            index
            element={FirstTransferEntry ? <FirstTransferEntry /> : <NOACCESS />}
          />
        </Route>
        <Route path="/contractor" element={<Layout />}>
          <Route
            index
            element={CreateContractor ? <CreateContractor /> : <NOACCESS />}
          />
        </Route>
        <Route path="/homecollection" element={<Layout />}>
          <Route
            index
            element={
              HomeCollectionEntry ? <HomeCollectionEntry /> : <NOACCESS />
            }
          />
        </Route>
        <Route path="/sts" element={<Layout />}>
          <Route index element={stsEntry ? <STSEntry /> : <NOACCESS />} />
        </Route>
        <Route path="/stshistory" element={<Layout />}>
          <Route
            index
            element={seeTransferHistory ? <STSHistory /> : <NOACCESS />}
          />
        </Route>
        <Route path="/contractorhistory" element={<Layout />}>
          <Route
            index
            element={ContractorHistory ? <ContractorHistory /> : <NOACCESS />}
          />
        </Route>
        <Route path="/map" element={<Layout />}>
          <Route index element={seeOptimizeRoute ? <Map /> : <NOACCESS />} />
        </Route>

        {/* Only STS Manager + Admin can access */}

        {/* Not Decided YET */}
        <Route path="/user/:userId" element={<UpdateProfile />} />
        <Route path="/transactions" element={<Layout />}>
          <Route
            index
            element={showTransaction ? <Transaction /> : <NOACCESS />}
          />
        </Route>
        <Route path="/about" element={<Layout />}>
          <Route index element={showTransaction ? <About /> : <NOACCESS />} />
        </Route>
        {/* Not Decided YET */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
