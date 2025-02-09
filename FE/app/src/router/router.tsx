import { Route, Routes } from "react-router-dom";
import SignUp from "../userAuth/userRegister";
import { AppPaths } from "../Routes/route";
import SignIn from "../userAuth/userLogin";
import Home from "../components/Home";
import ProtectedRoutes from "./protectedRoutes";
export default function appRoutes() {
  return (
    <Routes>
      <Route path={AppPaths.SIGNUP} element={<SignUp />} />
      <Route path={AppPaths.LOGIN} element={<SignIn />} />
      <Route
        path={AppPaths.HOME}
        element={<ProtectedRoutes component={<Home />} />}
      />
    </Routes>
  );
}
