import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import VerifyPhone from './pages/auth/VerifyPhone';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import FindTutors from './pages/FindTutors';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text-primary font-sans">
        <Header userRole="logged-out" />
        <main className="flex-1 p-4 md:p-8 flex flex-col">
          <Routes>
            <Route path="/" element={<div className="text-center p-8"><h1 className="text-2xl font-bold">Welcome to TutorTrust PK</h1></div>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-phone" element={<VerifyPhone />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/find-tutors" element={<FindTutors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
