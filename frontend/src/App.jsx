import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/RegisterPage.jsx';
import CreatePost from './post/component/CreatePost.jsx';
import PostFeed from './post/component/PostFeed.jsx';
import AdminPage from './pages/AdminPage.jsx';
import './App.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
     
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/feed" element={<PostFeed />} />
          <Route path="/admin" element={<AdminPage />} /> {}
        </Routes>
      </Router>
    </>
  );
}

export default App;
