import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Grid, Typography } from "@mui/material";
import "./RoomJoin.scss";

const RoomJoin = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  const handleClick = async () => {
    if (roomCode === "") {
      setError("Please enter a room code.");
      return;
    }

    try {
      axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/join-room`,
        {
          code: roomCode,
        },
        { withCredentials: true }
      );
      navigate(`/room/${roomCode}`);
    } catch (error) {
      console.log(error);
      setError("Room not found!");
    }
  };

  return (
    <div className="roomJoin">
      <Grid className="grid" container spacing={1} alignItems={"center"}>
        <Grid item xs={12}>
          <Typography variant="h4" component={"h4"}>
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={error !== "" ? true : false}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={handleCodeChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default RoomJoin;
