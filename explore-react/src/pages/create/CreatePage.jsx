import { useState } from "react";
import { useDispatch } from "react-redux";
import short from "short-uuid";
import { useNavigate } from "react-router-dom";

import { insertItem } from "../../feature/upcoming/upcomingSlice";
import { Box, Button, Typography, TextField } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [desc, setDesc] = useState("");
  const [countStart, setCountStart] = useState(
    dayjs().format("YYYY/MM/DD HH:mm")
  );
  const [countEnd, setCountEnd] = useState(
    dayjs().format("YYYY/MM/DD HH:mm")
  );

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

  const submitData = (e) => {
    e.preventDefault();

    if (dayjs(countEnd).valueOf() < dayjs(countStart).valueOf()) {
      return alert("Enddate cannot be less than Start Time")
    }

    const sendData = {
      id: short.generate(),
      name: name,
      image_url: url,
      desc: desc,
      claimed: false,
      total_claim: 0,
      endtime: false,
      countdown: {
        start: dayjs(countStart).valueOf(),
        end: dayjs(countEnd).valueOf(),
      },
    };

    try {
      dispatch(insertItem(sendData));
      return navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

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
          Create Item
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
