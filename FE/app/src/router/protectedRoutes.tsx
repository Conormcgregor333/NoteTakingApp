type protectedProps = {
  component: React.ReactNode;
  route?: string;
};
import { Navigate } from "react-router-dom";
import { AppPaths } from "../Routes/route";
export default function ProtectedRoutes(props: protectedProps) {
  const { component } = props;
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? component : <Navigate to={AppPaths.LOGIN} />;
}
