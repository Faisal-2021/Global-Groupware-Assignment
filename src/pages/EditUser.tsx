import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '@/services/api';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Save, User as UserIcon } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import { motion } from 'framer-motion';

const EditUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await getUser(Number(id));
        setUser(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast({
          title: 'Error',
          description: 'Failed to load user data. Please try again.',
          variant: 'destructive',
        });
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate, toast]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { firstName: '', lastName: '', email: '' };

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) return;

    try {
      setSaving(true);
      await updateUser(Number(id), {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      
      toast({
        title: 'Success',
        description: 'User updated successfully.',
      });
      
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-2xl">
          <motion.button
            onClick={handleCancel}
            className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Back to users"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to users
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Edit User</CardTitle>
                <CardDescription>
                  Update user information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user && (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img 
                          src={user.avatar}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                          <UserIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-start">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`mt-1 border-gray-200 w-full ${errors.firstName ? 'border-destructive' : ''}`}
                            placeholder="First name"
                            aria-invalid={!!errors.firstName}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-start">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`mt-1 border-gray-200 w-full ${errors.lastName ? 'border-destructive' : ''}`}
                            placeholder="Last name"
                            aria-invalid={!!errors.lastName}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-start">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`mt-1 border-gray-200 w-full ${errors.email ? 'border-destructive' : ''}`}
                          placeholder="user@example.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default EditUser;
