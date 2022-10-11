import react, { useState, useEffect, useMemo } from "react";
import moment from "moment-timezone";
import { useDispatch } from "react-redux";

import { updateEndTimeAllData } from "../../feature/upcoming/upcomingSlice";
import { Link } from "react-router-dom";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Backdrop,
} from "@mui/material";

const AdminDataItem = ({
  id,
  name,
  desc,
  image_url,
  claimed,
  total_claim,
  endtime,
  countdown,
}) => {
  const dispatch = useDispatch();

  const [openDetail, setOpenDetail] = useState(false);

  const updateTime = () => {
    let current = moment().isAfter(
      moment(countdown.end).format("YYYY/MM/DD HH:mm")
    );

    if (current) {
      return dispatch(updateEndTimeAllData({ id: id }));
    }
  };

  useEffect(() => {
    updateTime();
  }, []);

  return (
    <>
      <Grid xs={4}>
        <Card
          variant="outlined"
          sx={{ display: "flex", m: 1, flexDirection: "column" }}
        >
          <CardMedia
            component="img"
            height="400"
            image={image_url}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setOpenDetail(true)}
          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                EndTime: {endtime ? "true" : "false"}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                claimed: {claimed ? "true" : "false"}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Total CLaim: {total_claim}
              </Typography>

              <Button>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/admin/edit/${id}`}
                >
                  Edit
                </Link>
              </Button>
            </CardContent>
          </Box>
        </Card>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openDetail}
        onClick={() => setOpenDetail(false)}
      >
        <Box sx={{ display: "flex", m: 1, gap: 2, flexDirection: "column" }}>
          <CardMedia component="img" height="500" image={image_url} />
          <Typography component="div" variant="h3">
            {name}
          </Typography>

          <Typography component="div" variant="subtitle1">
            {desc}
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            EndTime: {endtime ? "true" : "false"}
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            claimed: {claimed ? "true" : "false"}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Total CLaim: {total_claim}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

const AdminData = ({ data }) => {
  return (
    <>
      {data.length != 0 ? (
        <Grid
          container
          rowSpacing={1}
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((obj, index) => (
            <AdminDataItem
              key={index}
              id={obj.id}
              name={obj.name}
              desc={obj.desc}
              claimed={obj.claimed}
              image_url={obj.image_url}
              total_claim={obj.total_claim}
              endtime={obj.endtime}
              countdown={obj.countdown}
            />
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
    </>
  );
};

export default AdminData;
