import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Layout from "./Dashboard/components/shared/Layout.jsx";
import Dashboard from "./Dashboard/pages/Dashboard.jsx";
import MoreInfoUser from "./Dashboard/pages/MoreInfoUser.jsx";
import UserList from "./Dashboard/pages/User-List/UserList.jsx";
import CreateUser from "./Dashboard/pages/User-Create/CreateUser.jsx";
import AddVehicle from "./Dashboard/pages/AddVehicle/Index.jsx";
import Profile from "./Dashboard/pages/Profile/index.jsx";
import AccessRoles from "./Dashboard/pages/Access Roles/index.jsx";
import LandFiill from "./Dashboard/pages/Landfill-Entry/index.jsx";
import Permission from "./Dashboard/pages/Permission/index.jsx";
import STSEntry from "./Dashboard/pages/STS-Entry/index.jsx";
import Transaction from "./Dashboard/pages/Transaction/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/moreInfoUser/:userId" element={<MoreInfoUser />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/userList" element={<Layout />}>
          <Route index element={<UserList />} />
        </Route>
        <Route path="/addVehicle" element={<Layout />}>
          <Route index element={<AddVehicle />} />
        </Route>
        <Route path="/profile" element={<Layout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/transactions" element={<Layout />}>
          <Route index element={<Transaction />} />
        </Route>
        <Route path="/userRoles" element={<Layout />}>
          <Route index element={<AccessRoles />} />
        </Route>
        <Route path="/permisssion" element={<Layout />}>
          <Route index element={<Permission />} />
        </Route>
        <Route path="/landfill" element={<Layout />}>
          <Route index element={<LandFiill />} />
        </Route>
        <Route path="/sts" element={<Layout />}>
          <Route index element={<STSEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
