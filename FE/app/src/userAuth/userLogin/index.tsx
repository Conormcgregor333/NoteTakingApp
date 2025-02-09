import {
  Box,
  Button,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AppPaths } from "../../Routes/route";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { useState } from "react";
const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignIn() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3500/login", {
        user: user,
        pwd: password,
        email: email,
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.data.token);
        navigate(AppPaths.HOME);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const validateInputs = () => {
    console.log("Validating inputs");

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!user || user.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    // return isValid;
    if (isValid) {
      handleLogin();
    }
  };
  function handleClickOpen() {
    navigate(AppPaths.SIGNUP);
  }
  return (
    <>
      <SignUpContainer direction="column" justifyContent="space-between">
        {/* <Button variant="outlined" onClick={handleLogin}>
          test login
        </Button> */}
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box display="flex" justifyContent="flex-start" marginBottom={1}>
            <FormLabel htmlFor="password">Full Name</FormLabel>
          </Box>
          <TextField
            onChange={(e) => {
              setUser(e.target.value);
            }}
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? "error" : "primary"}
          />
          <Box display="flex" justifyContent="flex-start" marginBottom={1}>
            <FormLabel htmlFor="password">Email</FormLabel>
          </Box>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={emailError}
            helperText={emailErrorMessage}
            color={emailError ? "error" : "primary"}
          />
          <Box display="flex" justifyContent="flex-start" marginBottom={1}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={passwordError}
            helperText={passwordErrorMessage}
            color={passwordError ? "error" : "primary"}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>

          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Dont have an account?
          </Link>
        </Card>
      </SignUpContainer>
    </>
  );
}
