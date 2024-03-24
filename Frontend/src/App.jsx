import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Layout from "./Dashboard/components/shared//Layout.jsx";
import Dashboard from "./Dashboard/pages/Dashboard.jsx";
import UserList from "./Dashboard/pages/UserList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/userList" element={<Layout />}>
          <Route index element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
