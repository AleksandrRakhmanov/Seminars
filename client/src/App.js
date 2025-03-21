import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './ResetStyles.css';
import Navbar from './layouts/Navbar/Navbar';
import Seminars from './pages/Seminars/Seminars';
import About from './pages/About/About';
import LoginForm from './pages/UserDashboard/LoginForm/LoginForm';
import RegistrationForm from './pages/UserDashboard/RegistrationForm/RegistrationForm';
import YourSeminars from './pages/YourSeminars/YourSeminars';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import UserProfile from './pages/UserProfile/UserProfile';
import SeminarPage from './pages/SeminarPage/SeminarPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='App2'>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/seminars" element={<Seminars />} />
  <Route path="/seminars/:id" element={<SeminarPage />} />
  <Route path="/auth" element={<LoginForm />} />
  <Route path="/registration" element={<RegistrationForm />} />
  <Route path="/yourseminars" element={<YourSeminars />} />
  <Route path="/about" element={<About />} />
  <Route path="/favorites" element={<Favorites />} />
  <Route path="/profile" element={<UserProfile/>} />
</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
