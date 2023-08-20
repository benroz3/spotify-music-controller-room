import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInRoom = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/user-in-room`,
          { withCredentials: true }
        );
        if (res.data.code) navigate(`/room/${res.data.code}`);
      } catch (error) {
        console.log(error);
      }
    };
    userInRoom();
  }, [navigate]);

  return (
    <div className="home">
      <Grid className="grid" container spacing={3}>
        <Grid item xs={12} alignSelf={"center"}>
          <Typography variant="h3" component={"h3"}>
            Music Streaming Room
          </Typography>
        </Grid>
        <Grid item xs={12} alignSelf={"center"}>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Link to="/join">
              <Button color="primary">Join a Room</Button>
            </Link>
            <Link to="/create">
              <Button color="secondary">Create a Room</Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
