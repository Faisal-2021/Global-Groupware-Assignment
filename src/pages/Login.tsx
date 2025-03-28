import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, UserCircle2 } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import { LoginCredentials } from '@/types/user';
import { useState } from 'react';

// Define the validation schema with Zod
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
  password: z.string()
    .min(3, 'Password must be at least 3 characters long')
    .nonempty('Password is required'),
});

// Use the LoginCredentials type directly to ensure type compatibility
type LoginFormValues = LoginCredentials;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      navigate('/users');
    } catch (error) {
      // Form error handling is handled by the form itself and the auth provider
      console.error('Login failed', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex justify-center"
            >
              <UserCircle2 className="h-16 w-16 text-primary" />
            </motion.div>
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold tracking-tight mt-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
            >
              EmployWise
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-muted-foreground mt-2"
            >
              Simplifying employee management
            </motion.p>
          </div>
          
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className='flex flex-col items-start'>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            {...field} 
                            className="border-gray-200 focus-visible:ring-primary/70 w-full"
                            aria-required="true"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className='flex flex-col items-start w-full'>
                        <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                        <div className="relative w-full">
                          <FormControl>
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                              className="border-gray-200 focus-visible:ring-primary/70 pr-10 w-full"
                              aria-required="true"
                              autoComplete="current-password"
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full transition duration-300 ease-in-out bg-primary hover:bg-primary/90"
                    disabled={form.formState.isSubmitting}
                    aria-label="Sign in to your account"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <span className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center pt-0">
              <p className="text-sm text-muted-foreground">
                Demo credentials: eve.holt@reqres.in / cityslicka
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
