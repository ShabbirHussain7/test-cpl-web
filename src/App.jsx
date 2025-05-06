import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Publications from './pages/Publications';
import People from './pages/People';
import Research from './pages/Research';
import JoinUs from './pages/JoinUs';
import AllReports from './pages/AllReports';
import Report from './pages/Report';
import Terms from './pages/Terms';
import Updates from './pages/Updates';
import News from './pages/News';
import Talks from './pages/Talks';
import { Navigate } from 'react-router-dom';
import './App.css';

import { useEffect } from 'react';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {

  return (
    <div className='App'>
    <HashRouter>
    <ScrollToTop />
      <Header />
      <Routes>
      <Route path="/test-cpl-web" element={<Navigate replace to="/test-cpl-web/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/people" element={<People />} />
        <Route path="/research/:area" element={<Research />} />
        <Route path="/reports" element={<AllReports />} />
        <Route path="/reports/:report" element={<Report />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/news" element={<News />} />
       
      </Routes>
      <Footer />
    </HashRouter>
    </div>
  );
}