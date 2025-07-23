import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import Analysis from './Upload/Analysis';
import Loading from './Upload/Loading';
import Result from './Upload/Result';
import LandingPage from './Pages/LandingPage';
import Segmentation from './Pages/Segmentation';
import SegmentationHistory from './Pages/SegmentationHistory';
import SegmentationDetail from './Pages/SegmentationDetail';
import History from './Upload/History';
import HistoryPage from './Pages/HistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history/classification" element={<History />} />
        <Route path="/segmentation" element={<Segmentation />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/segmentation-history" element={<SegmentationHistory />} />
        <Route path="/segmentation-detail/:id" element={<SegmentationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
