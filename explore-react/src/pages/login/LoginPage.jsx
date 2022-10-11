import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/Auth";

import { TextField, Box, Button } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const { handleLogin, user } = useAuth();

  const navigate = useNavigate();

  const submitLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        handleLogin({ username: username });
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    },
    [handleLogin, username]
  );

  return (
    <div>
      <Box
        height={"50vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={submitLogin} autoComplete="off">
          <h1>Login</h1>
          <TextField
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type username..."
          />
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#5200FF",
              marginTop: 2,
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
