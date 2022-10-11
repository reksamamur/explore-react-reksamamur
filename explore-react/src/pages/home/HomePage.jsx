import { Box, Typography, Divider } from "@mui/material";
import Upcoming from "../../components/upcoming/Upcoming";

import { useSelector } from "react-redux";

const Home = () => {
  const { upcomingItems } = useSelector((state) => state.upcoming);

  return (
    <div>
      <Box sx={{
        marginBottom: 10
      }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome!
          </Typography>
          <Typography variant="subtitle1">
            Claim all item within limited time!
          </Typography>
        </Box>

        <Upcoming data={upcomingItems} />
      </Box>
    </div>
  );
};

export default Home;
