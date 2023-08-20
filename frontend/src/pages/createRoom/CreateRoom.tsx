import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
  Alert,
} from "@mui/material";
import "./CreateRoom.scss";

const CreateRoom: React.FC<{
  update: boolean;
  roomCode: string | undefined;
  votes: number;
  canPause: boolean;
  setShowSettings: (value: boolean) => void;
}> = ({ update, roomCode, votes, canPause, setShowSettings }) => {
  const [guestsCanPause, setGuestsCanPause] = useState(canPause);
  const [votesToSkip, setVotesToSkip] = useState(votes);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVotesToSkip(parseInt(event.target.value));
  };

  const handleGuestsCanPauseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGuestsCanPause(event.target.value === "true" ? true : false);
  };

  const handleCreateRoom = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/create-room`,
        {
          votes_to_skip: votesToSkip,
          guest_can_pause: guestsCanPause,
        },
        { withCredentials: true }
      );
      navigate(`/room/${res.data.code}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/update-room`,
        {
          code: roomCode,
          votes_to_skip: votesToSkip,
          guest_can_pause: guestsCanPause,
        },
        { withCredentials: true }
      );
      setSuccess("Room Saved!");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="createRoom">
      <Grid className="grid" container spacing={1}>
        <Grid item xs={12} alignItems={"center"}>
          <Typography component={"h4"} variant="h4">
            {update ? "Update" : "Create"} a Room
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems={"center"}>
          <FormControl component={"fieldset"}>
            <FormHelperText style={{ textAlign: "center" }}>
              Guests Control
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={canPause}
              onChange={handleGuestsCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} alignItems={"center"}>
          <FormControl>
            <TextField
              required
              type="number"
              defaultValue={votes}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              onChange={handleVotesChange}
            />
            <FormHelperText style={{ textAlign: "center" }}>
              Votes Required to Skip Song
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} alignItems={"center"}>
          <Button
            color="primary"
            variant="contained"
            onClick={update ? handleUpdateRoom : handleCreateRoom}
          >
            {update ? "Update" : "Create"} a Room
          </Button>
        </Grid>
        {update ? (
          <>
            <Grid item xs={12} alignSelf={"center"}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setShowSettings(false);
                }}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={12} alignSelf={"center"}>
              <Collapse in={error !== "" || success !== ""}>
                {success !== "" ? (
                  <Alert
                    severity="success"
                    onClose={() => {
                      setSuccess("");
                    }}
                  >
                    {success}
                  </Alert>
                ) : (
                  <Alert
                    severity="error"
                    onClose={() => {
                      setError("");
                    }}
                  >
                    {error}
                  </Alert>
                )}
              </Collapse>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} alignItems={"center"}>
            <Link to="/">
              <Button color="secondary" variant="contained">
                Back
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CreateRoom;
