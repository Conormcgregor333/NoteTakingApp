import { Box, Button } from "@mui/material";
import axios from "axios";
import { AppPaths } from "../../Routes/route";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  function handleLogout() {
    axios
      .get("http://localhost:3500/logout")
      .then((resp) => {
        console.log(resp);
        localStorage.clear();
        navigate(AppPaths.LOGIN);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Box>
      <Box>Hello, welcome to the beautiful world of React!</Box>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
