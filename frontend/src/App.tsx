import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from "./pages/createRoom/CreateRoom";
import Home from "./pages/home/Home";
import RoomJoin from "./pages/roomJoin/RoomJoin";
import Room from "./pages/room/Room";
import FramerDiv from "./components/FramerDiv";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <FramerDiv key="1">
              <Home />
            </FramerDiv>
          }
        />
        <Route
          path="/join"
          element={
            <FramerDiv key="2">
              <RoomJoin />
            </FramerDiv>
          }
        />
        <Route
          path="/create"
          element={
            <FramerDiv key="3">
              <CreateRoom
                update={false}
                roomCode={undefined}
                votes={2}
                canPause={true}
                setShowSettings={() => {}}
              />
            </FramerDiv>
          }
        />
        <Route
          path="/room/:code"
          element={
            <FramerDiv key="4">
              <Room />
            </FramerDiv>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
