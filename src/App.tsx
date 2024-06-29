import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import MyPage from '@pages/mypagePage/MyPage';
import TeacherWritePage from '@pages/group/TeacherWritePage';
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
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/group/teacher-write" element={<TeacherWritePage />} />
            </Routes>
          </Router>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
