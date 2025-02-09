import "./App.css";
import { AppProvider } from "./ContextAPI/appContext";
import appRoutes from "./router/router";
import Home from "./components/Home";
import { Button } from "@mui/material";
import axios from "axios";
function App() {
  function handleLogin() {
    axios
      .post("http://localhost:3500/login", {
        user: `abcd`,
        pwd: "12345678",
        email: "abcd@abcd.com",
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <AppProvider state={{}}>
      {appRoutes()}
      {/* <Home /> */}
      {/* <Button variant="outlined" onClick={handleLogin}>
        test
      </Button> */}
    </AppProvider>
  );
}

export default App;
