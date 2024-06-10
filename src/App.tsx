import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Group from "./routes/Group";
import MyPage from "./routes/MyPage";
import Way from "./routes/Way";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/home" element={<Home />} />
          <Route path="/group" element={<Group />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/way" element={<Way />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
