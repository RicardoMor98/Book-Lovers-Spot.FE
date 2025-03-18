import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginUser from './Components/LoginUser';
import AuthorDashboard from './Components/AuthorDashboard';
import ReaderDashboard from './Components/ReaderDashboard';
import PublishReading from './Components/PublishReading';
import FetchReading from './Components/FetchReadings';
import Profile from './Components/Profile';
import ViewReadings from './Components/ViewReadings';
import RegisterUser from './Components/RegisterUser';
import ReadingDetail from './Components/ReadingDetail';
import Favorites from './Components/Favorites';
import LandingPage from './Components/LandingPage';
import ScrollToTop from './Components/ScrollToTop';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/author-dashboard" element={<AuthorDashboard />} />
                <Route path="/addnewreading" element={<PublishReading />} />
                <Route path="/reader-dashboard" element={<ReaderDashboard />} />
                <Route path="/readings" element={<FetchReading />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register-user" element={<RegisterUser />} />
                <Route path="/view-readings" element={<ViewReadings />} />
                <Route path="/reading/:id" element={<ReadingDetail />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    );
}

export default App;
