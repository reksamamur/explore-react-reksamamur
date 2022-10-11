import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateData } from "../../feature/upcoming/upcomingSlice";

import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Snackbar,
} from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Create = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { allData } = useSelector((state) => state.upcoming);

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [desc, setDesc] = useState("");
  const [countStart, setCountStart] = useState(
    dayjs().format("YYYY/MM/DD HH:mm")
  );
  const [countEnd, setCountEnd] = useState(dayjs().format("YYYY/MM/DD HH:mm"));
  const [endtime, setEndtime] = useState(false);

  const handleChangeStart = (newValue) => {
    setCountStart(newValue);
  };

  const handleChangeEnd = (newValue) => {
    if (dayjs(newValue).valueOf() < dayjs(countStart).valueOf()) {
      return alert("Enddate cannot be less than Start Time");
    } else {
      setCountEnd(newValue);
    }
  };

  const checkData = () => {
    const getDataCurrent = allData.find((obj) => obj.id == params.id);

    if (getDataCurrent) {
      setID(getDataCurrent.id);
      setName(getDataCurrent.name);
      setURL(getDataCurrent.image_url);
      setDesc(getDataCurrent.desc);
      setCountStart(getDataCurrent.countdown.start);
      setCountEnd(getDataCurrent.countdown.end);
      setEndtime(getDataCurrent.endtime);
    } else {
      return navigate("/admin", { replace: true });
    }
  };

  useEffect(() => {
    checkData();
  }, []);

  const submitData = (e) => {
    e.preventDefault();

    const sendData = {
      id: id,
      name: name,
      image_url: url,
      desc: desc,
      countdown: {
        start: parseInt(countStart),
        end: parseInt(countEnd),
      },
      endtime: endtime,
    };

    try {
      setOpen(true)
      dispatch(updateData(sendData));
      return navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Success Edit"
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Edit Item: {name}
        </Typography>
      </Box>

      <form onSubmit={(e) => submitData(e)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 20,
          }}
        >
          <div>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              Name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={"text"}
              required
              placeholder="Name Item"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              Image URL
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={"url"}
              required
              placeholder="https://image_url."
              onChange={(e) => setURL(e.target.value)}
              value={url}
            />
          </div>

          <div>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              Descriptions
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={"text"}
              multiline
              required
              rows={4}
              placeholder="Item descriptions"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Countdown
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Startdate
                </Typography>
                <DateTimePicker
                  ampm={false}
                  value={countStart}
                  minDate={dayjs()}
                  onChange={handleChangeStart}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Enddate
                </Typography>
                <DateTimePicker
                  ampm={false}
                  value={countEnd}
                  minDate={dayjs()}
                  onChange={handleChangeEnd}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Box>
            </Box>
          </LocalizationProvider>

          <div>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              Set Availability
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={endtime}
                    checked={endtime}
                    onChange={(e) => setEndtime(e.target.checked)}
                  />
                }
                label="End time ?"
              />
            </FormGroup>
          </div>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              onClick={() => navigate("/admin", { replace: true })}
              variant="text"
              size="large"
              sx={{
                borderColor: "#5200FF",
                color: "#5200FF",
              }}
              type={"button"}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#5200FF",
                color: "#5200FF",
              }}
              type={"submit"}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Create;
