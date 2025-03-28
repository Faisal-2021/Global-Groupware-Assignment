
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Search, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearch } from '@/contexts/SearchContext';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const isUserListPage = location.pathname === '/users';

  return (
    isAuthenticated && (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md px-6 py-3 flex justify-between items-center shadow-sm border-b border-gray-100"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mr-2"
        >
          <UserCircle2 className="h-7 w-7 text-primary" />
        </motion.div>
        <motion.h1 
          className="text-xl font-medium tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          EmployWise
        </motion.h1>
      </div>
      
      
        <motion.div 
          className="flex items-center gap-4"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {isUserListPage && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-[200px] md:w-[300px] pl-9 rounded-full bg-gray-50 border-gray-200 text-sm focus-visible:ring-primary/70"
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="flex items-center gap-2 hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </motion.div>
    </motion.nav>
  )
  );
};

export default Navbar;
