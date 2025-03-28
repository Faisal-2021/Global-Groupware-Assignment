
import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '@/services/api';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import UserCard from '@/components/UserCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import { useSearch } from '@/contexts/SearchContext';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const { searchQuery } = useSearch();

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeletePrompt = (id: number) => {
    setDeleteUserId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUserId) return;
    
    try {
      setDeleting(true);
      await deleteUser(deleteUserId);
      
      // Update the UI by removing the deleted user
      setUsers(users.filter(user => user.id !== deleteUserId));
      
      toast({
        title: 'User deleted',
        description: 'The user has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteUserId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || email.includes(query);
  });

  // Layout animation for grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen py-20 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 mt-6">
            <motion.h1 
              className="text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              User Management
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              View, edit and manage your team members
            </motion.p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <>
              {filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60">
                  <p className="text-muted-foreground">No users found matching your search.</p>
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentPage(1)} 
                      className="mt-4"
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredUsers.map((user, index) => (
                    <UserCard 
                      key={user.id} 
                      user={user} 
                      onDelete={handleDeletePrompt}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}

              <div className="mt-8 flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn-hover-effect"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn-hover-effect"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <AlertDialog open={deleteUserId !== null} onOpenChange={handleDeleteCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-destructive-foreground"></span>
                  Deleting...
                </>
              ) : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AnimatedPage>
  );
};

export default UserList;
