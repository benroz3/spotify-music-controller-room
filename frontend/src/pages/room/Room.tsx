import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateRoom from "../createRoom/CreateRoom";
import { Grid, Button, Typography } from "@mui/material";
import FramerDiv from "../../components/FramerDiv";
import { SongType } from "../../types/types";
import "./Room.scss";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";

const Room = () => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestsCanPause, setGuestsCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState<SongType>();

  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateSpotify = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/spotify/is-authenticated`,
          { withCredentials: true }
        );
        setSpotifyAuthenticated(res.data);

        if (!res.data) {
          const urlRes = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/spotify/get-auth-url`,
            { withCredentials: true }
          );
          navigate(urlRes.data.url);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/get-room?code=${code}`,
          { withCredentials: true }
        );
        setVotesToSkip(res.data.votes_to_skip);
        setGuestsCanPause(res.data.guest_can_pause);
        setIsHost(res.data.is_host);

        authenticateSpotify();
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    const getCurrentSong = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/spotify/current-song?code=${code}`,
          {
            withCredentials: true,
          }
        );

        setSong(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
    getCurrentSong();

    const interval = setInterval(getCurrentSong, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [code, navigate, isHost]);

  const handleClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/leave-room`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!showSettings && (
        <div className="room">
          <Grid className="grid" container spacing={1}>
            <Grid item xs={12} alignSelf={"center"}>
              <Typography variant="h4" component={"h4"}>
                Code: {code}
              </Typography>
            </Grid>
            <MusicPlayer song={song} />
            {isHost && (
              <Grid item xs={12} alignSelf={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowSettings(true);
                  }}
                >
                  Show Settings
                </Button>
              </Grid>
            )}
            <Grid item xs={12} alignSelf={"center"}>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClick}
              >
                Leave Room
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
      {showSettings && (
        <FramerDiv key="5">
          <CreateRoom
            update={true}
            roomCode={code}
            votes={votesToSkip}
            canPause={guestsCanPause}
            setShowSettings={setShowSettings}
          />
        </FramerDiv>
      )}
    </>
  );
};

export default Room;
