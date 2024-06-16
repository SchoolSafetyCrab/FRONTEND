import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JoinPage from './routes/JoinPage';
import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import GroupPage from './routes/GroupPage';
import MyPage from './routes/MyPage';
import WayPage from './routes/WayPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join/*" element={<JoinPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/way" element={<WayPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
