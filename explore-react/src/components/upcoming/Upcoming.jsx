import React, { useState, useEffect, useMemo } from "react";
import iauction from "iauction";

import moment from "moment-timezone";
import { useDispatch } from "react-redux";

import {
  updateEndTimeAllData,
  updateItem,
} from "../../feature/upcoming/upcomingSlice";

import {
  insertItem as insertItemClaim,
  updateItem as updateItemClaim,
} from "../../feature/claimed/claimedSlice";

import { useSelector } from "react-redux";

import {
  Grid,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Snackbar,
  Backdrop,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
const UpcomingItem = ({
  id,
  name,
  img,
  desc,
  endtime,
  claim,
  countdown,
  snackOpen,
}) => {
  const [times, setTimes] = useState(null);
  const dispatch = useDispatch();

  const { upcomingItems } = useSelector((state) => state.upcoming);

  const [validateTime, setValidateTime] = useState(true);
  const [itsClaim, setItsClaim] = useState(true);

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
    iauction({
      countdownInMin: 2,
      startDate: countdown.start,
      endDate: countdown.end,
      callback: (time) => {
        setTimes(time);
        if (time.start === true) {
          setItsClaim(false);
        } else {
          setItsClaim(true);
        }
      },
    });

    validateMoment();
    updateTime();
  }, []);

  const validateMoment = () => {
    if (moment() === moment(countdown.start)) {
      setValidateTime(false);
    } else {
      setValidateTime(true);
    }
  };

  const claimItem = () => {
    if (!claim) {
      let dataClaim = upcomingItems.find((obj) => obj.id === id);
      dataClaim = {
        ...dataClaim,
        claimed: true,
        total_claim: dataClaim.total_claim + 1,
      };

      snackOpen(true);
      dispatch(updateItem({ id: id }));
      return dispatch(insertItemClaim(dataClaim));
    } else {
      snackOpen(true);
      dispatch(updateItem({ id: id }));
      return dispatch(updateItemClaim({ id: id }));
    }
  };

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
            image={img}
            sx={{
              cursor: 'pointer'
            }}
            onClick={() => setOpenDetail(true)}
          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
              {times !== null ? (
                <>
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
                    <AccessTimeIcon />
                    Countdown: {times.time}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    component="div"
                  >
                    Reps: {times.reps}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                    component="div"
                  >
                    Ready to claim{" "}
                    {validateTime ? moment(countdown.start).fromNow() : null}
                  </Typography>
                  {itsClaim ? (
                    <></>
                  ) : (
                    <>
                      <Button disabled={itsClaim} onClick={() => claimItem()}>
                        Claim
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
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
          <CardMedia component="img" height="500" image={img} />
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography component="div" variant="body1">
            {desc}
          </Typography>
          {times !== null ? (
            <>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccessTimeIcon />
                Countdown: {times.time}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
              >
                Reps: {times.reps}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
              >
                Ready to claim{" "}
                {validateTime ? moment(countdown.start).fromNow() : null}
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Backdrop>
    </>
  );
};

const Upcoming = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Yey, Claimed!"
      />
      {data.length != 0 ? (
        <Grid
          container
          rowSpacing={1}
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((obj) => {
            if (obj.endtime == false) {
              return (
                <UpcomingItem
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  desc={obj.desc}
                  img={obj.image_url}
                  countdown={obj.countdown}
                  claim={obj.claimed}
                  endtime={obj.endtime}
                  snackOpen={setOpen}
                />
              );
            }
          })}
        </Grid>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default Upcoming;
