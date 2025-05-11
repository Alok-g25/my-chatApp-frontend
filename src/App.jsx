import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Signup from "./pages/Signup"
import LoginPage from "./pages/LoginPage"
import { useAuthStore } from './store/useAuthUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import HomePage from './pages/HomePage';


function App() {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser){
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Layout (with Navbar) */}
      <Route element={authUser ? <MainLayout /> : <Navigate to="/login" />}>
      <Route path="/" element={<HomePage/> } />
      </Route>

      {/* Auth Layout (no Navbar) */}
      <Route element={!authUser ? <AuthLayout /> : <Navigate to="/" />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
