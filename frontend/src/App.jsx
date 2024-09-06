import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
// Layouts
import HomeLayout from './pages/User/HomeLayout'
import AuthLayout from './pages/Auth/AuthLayout.jsx';

// Auth forms
import LoginForm from './pages/Auth/LoginForm.jsx';
import RegisterForm from './pages/Auth/RegisterForm.jsx';
// Css styles
import { Home } from './pages/User/Pages/index.jsx';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <main className='flex h-screen'>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<LoginForm />} />
              <Route path="/sign-up" element={<RegisterForm />} />
            </Route>
          {/* User Routes */}
            <Route element={<HomeLayout />}>
              <Route index element={<Home />}/>
            </Route>
        </Routes>
    </main>
  );
}

export default App;
