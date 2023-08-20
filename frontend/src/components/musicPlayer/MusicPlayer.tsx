import { createRef } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { SongType } from "../../types/types";

const MusicPlayer: React.FC<{ song: SongType | undefined }> = ({ song }) => {
  const audioRef = createRef<HTMLAudioElement>();
  
  let songProgress = 0;
  if (song) songProgress = (song.time / song.duration) * 100;

  const pauseSong = async () => {
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/spotify/pause`, null, {
      withCredentials: true,
    });
  };

  const playSong = async () => {
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/spotify/play`, null, {
      withCredentials: true,
    });
  };

  const skipSong = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/spotify/skip`, null, {
      withCredentials: true,
    });
  };

  return (
    <div className="musicPlayer">
      <Card>
        <Grid container alignItems={"center"}>
          <Grid item xs={4}>
            <img src={song?.image_url} alt="" height="100%" width="100%" />
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography component={"h5"} variant="h5">
                {song?.title}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                {song?.artist}
              </Typography>
              <div>
                <IconButton onClick={song?.is_playing ? pauseSong : playSong}>
                  {song?.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={skipSong}>
                  {song?.votes} / {song?.votes_needed}
                  <SkipNextIcon />
                </IconButton>
              </div>
              {song?.preview_url && (
                <audio ref={audioRef} controls>
                  <source src={song.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    </div>
  );
};

export default MusicPlayer;
