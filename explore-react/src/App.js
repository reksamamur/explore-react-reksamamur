import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { RequireAuth, AuthProvider } from "./context/auth/Auth";

import Layouts from "./components/layouts/Layouts";

import Home from "./pages/home/HomePage";
import Claimed from "./pages/claimed/ClaimedPage";
import Admin from "./pages/admin/AdminPage";
import Create from "./pages/create/CreatePage";
import Edit from "./pages/edit/EditPage";

import Login from "./pages/login/LoginPage";
import Unauthorized from "./pages/unauthorized/UnauthorizedPage";

import NotFound from "./pages/not-found/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layouts />}>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Home />} />

            <Route key={"claimed"} path="claimed" element={<Claimed />} />
            <Route key={"login"} path="login" element={<Login />} />

            <Route
              key={"unauthorized"}
              path="unauthorized"
              element={<Unauthorized />}
            />
            <Route element={<RequireAuth />}>
              <Route key={"admin"} path="admin" element={<Admin />} />
              <Route
                key={"admin/create"}
                path="admin/create"
                element={<Create />}
              />
              <Route
                key={"admin/edit"}
                path="admin/edit/:id"
                element={<Edit />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
