import { useCallback } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { useAuth } from "../../context/auth/Auth";

const HandleLogout = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const submitLogout = useCallback(
    (e) => {
      e.preventDefault();
      handleLogout();
      navigate("/");
    },
    [handleLogout]
  );

  if (!user) {
    return <></>;
  } else {
    return (
      <Button
        onClick={submitLogout}
        sx={{
          color: "#CD2525",
          fontWeight: "bold",
          ":hover": {
            bgcolor: "#FFAFAF",
            color: "CD2525",
          },
        }}
      >
        Logout
      </Button>
    );
  }
};

const Layouts = () => {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar
          position="static"
          elevation={0}
          color={"transparent"}
          sx={{
            marginTop: 20,
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
              <Button
                sx={{
                  color: "#fff",
                  ":hover": {
                    bgcolor: "#DECEFF",
                    color: "white",
                  },
                }}
              >
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  to={"/"}
                >
                  Home
                </NavLink>
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  ":hover": {
                    bgcolor: "#DECEFF",
                    color: "white",
                  },
                }}
              >
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  to={"/claimed"}
                >
                  Claimed
                </NavLink>
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  ":hover": {
                    bgcolor: "#DECEFF",
                    color: "white",
                  },
                }}
              >
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  to={"/admin"}
                >
                  Admin
                </NavLink>
              </Button>
            </Box>
            <HandleLogout />
          </Toolbar>
        </AppBar>

        <Divider />

        <Outlet />
      </Container>
    </div>
  );
};

export default Layouts;
