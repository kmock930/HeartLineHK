import NavBar from "./components/NavBar";
import ChatModal from "./components/ChatModal";
import FloatBtn from "./components/FloatBtn";
import LoginModal from "./components/LoginModal";

function App() {

  return (
    <div className="App">
      <NavBar/>
      <div className="appContent">
        <ChatModal/>
        <LoginModal/>
      </div>
      <FloatBtn/>
    </div>
  );
}

export default App;
