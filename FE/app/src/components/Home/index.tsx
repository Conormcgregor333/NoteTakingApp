import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { AppPaths } from "../../Routes/route";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
export default function Home() {
  const token = localStorage.getItem("token");
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
  const onSubmit = (data: any) => {
    const body = {
      title: data.title,
      text: data.text,
    };
    axios
      .post(`http://localhost:3500/notes/create`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("note created");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm();
  return (
    <Box>
      <Box>Hello, welcome to the beautiful world of React!</Box>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
      <Typography>Fill the below form</Typography>
      <Controller
        name={"title"}
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            error={!!errors.name}
          />
        )}
      />
      <Controller
        name={"text"}
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Text"
            fullWidth
            margin="normal"
            error={!!errors.text}
          />
        )}
      />
      <Button
        variant="contained"
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Box>
  );
}
