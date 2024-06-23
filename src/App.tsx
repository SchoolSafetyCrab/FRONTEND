import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import GroupPage from '@routes/GroupPage';
import MyPage from '@routes/Mypage';
import JoinPage from './routes/JoinPage';
import LoginPage from './routes/LoginPage';
import MainPage from './routes/MainPage';

function App() {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className="justify-content-md-center align-items-center">
        <Col xs={12} md={8} lg={3} style={{ padding: '0' }}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/join/*" element={<JoinPage />} />
              <Route path="/group/*" element={<GroupPage />} />
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/main" element={<MainPage />} />
            </Routes>
          </Router>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
