import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Box, Button, Typography, Divider } from "@mui/material";

import AdminData from "../../components/admindata/AdminData";

const Admin = () => {
  const { allData } = useSelector((state) => state.upcoming);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Item Created
        </Typography>
        <Button
          sx={{
            color: "#5200FF",
            ":hover": {
              bgcolor: "#DECEFF",
              color: "white",
            },
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "#5200FF",
              fontWeight: "bold",
            }}
            to={"/admin/create"}
          >
            Create Item
          </Link>
        </Button>
      </Box>
      
      <div>
        <AdminData data={allData} />
      </div>
    </div>
  );
};

export default Admin;
