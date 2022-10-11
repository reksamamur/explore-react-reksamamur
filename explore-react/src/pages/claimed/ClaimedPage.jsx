import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Backdrop,
} from "@mui/material";

import {Favorite} from "@mui/icons-material";

const Claimed = () => {
  const { claimedItems } = useSelector((state) => state.claimed);
  const [openDetail, setOpenDetail] = useState(false);
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
          Claimed
        </Typography>
      </Box>
      {claimedItems != 0 ? (
        <Grid
          container
          rowSpacing={1}
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {claimedItems.map((obj) => (
            <>
              <Grid xs={4} key={obj.id}>
                <Card
                  variant="outlined"
                  sx={{ display: "flex", m: 1, flexDirection: "column" }}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={obj.image_url}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenDetail(true)}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography gutterBottom component="div" variant="h5">
                        {obj.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        component="div"
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Favorite
                          sx={{
                            color: "#5200FF",
                          }}
                        />{" "}
                        Total Claim: {obj.total_claim}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openDetail}
                onClick={() => setOpenDetail(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    m: 1,
                    gap: 2,
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="500"
                    image={obj.image_url}
                  />
                  <Typography component="div" variant="h5">
                    {obj.name}
                  </Typography>
                  <Typography component="div" variant="body1">
                    {obj.desc}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Favorite
                    />
                    Total Claim: {obj.total_claim}
                  </Typography>
                </Box>
              </Backdrop>
            </>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FAFAFA",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 2,
              paddingBottom: 2,
              borderRadius: 2,
            }}
          >
            Empty
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Claimed;
