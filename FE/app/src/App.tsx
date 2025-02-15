import "./App.css";
import { AppProvider } from "./ContextAPI/appContext";
import appRoutes from "./router/router";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "./Routes/route";
function App() {
  const navigate = useNavigate();
  const requestNewToken = () => {
    axios
      .get("http://localhost:3500/refresh", { withCredentials: true })
      .then((resp) => {
        console.log("refresh token called");
        localStorage.setItem("token", resp?.data?.access_token);
        navigate(AppPaths.HOME);
      })
      .catch((err) => {
        console.log("error while refresh token.");
        console.log(err);
        localStorage.clear();
        navigate(AppPaths.LOGIN);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3500/user/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("user info recieved");
        navigate(AppPaths.HOME);
      })
      .catch((err) => {
        console.log("error while fetching user details.");

        if (err.response.status === 401 || err.response.status === 403) {
          // refresh call
          requestNewToken();
        } else {
          navigate(AppPaths.LOGIN);
        }
        //token expired re issue
        // token not sent re issue
        // user not found login again
        // user id not send login again
      });
  }, []);
  return <AppProvider state={{}}>{appRoutes()}</AppProvider>;
}

export default App;
//login get user id
//store in ls
//check via middle ware
//send req with user id in query param
//at the time of login clear the ls first
//perform the intenede action on the FE side

//make some API call in the home page , if the API call returns token expired then make the refresh token call ,
// if that also return expired then navigate to login
//OR
//make the API call in the index.tsx file and do the above steps
// the API call could be for retrieving the user data
