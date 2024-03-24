import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Layout from "./Dashboard/components/shared//Layout.jsx";
import Dashboard from "./Dashboard/pages/Dashboard.jsx";
import UserList from "./Dashboard/pages/UserList.jsx";
import CreateUser from "./Dashboard/pages/CreateUser.jsx";
import AddVehicle from "./Dashboard/pages/AddVehicle/Index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/userList" element={<Layout />}>
          <Route index element={<UserList />} />
        </Route>
        <Route path="/addVehicle" element={<Layout />}>
          <Route index element={<AddVehicle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
