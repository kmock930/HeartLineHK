import NavBar from "./components/NavBar";
import ChatModal from "./components/ChatModal";
import FloatBtn from "./components/FloatBtn";
import LoginModal from "./components/LoginModal";
import RatingModal from "./components/RatingModal";

function App() {

  return (
    <div className="App">
      <NavBar/>
      <div className="appContent">
        <ChatModal/>
        <LoginModal/>
        <RatingModal/>
      </div>
      <FloatBtn/>
    </div>
  );
}

export default App;
