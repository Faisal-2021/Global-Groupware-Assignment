
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import Login from '@/pages/Login';
import UserList from '@/pages/UserList';
import EditUser from '@/pages/EditUser';
import NotFound from '@/pages/NotFound';
import Navbar from '@/components/Navbar';
import { SearchProvider } from '@/contexts/SearchContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
