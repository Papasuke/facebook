import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import Loader from '@/components/shared/Loader';
import axios from 'axios';

// Define Zod schema
const signupValidation = z.object({
    name: z.string().min(2, { message: 'Invalid name' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    re_password: z.string().min(8, { message: 'Please confirm your password' })
  })
    .refine(data => data.password === data.re_password, {
      message: 'Passwords do not match',
      path: ['re_password'], // Specify the path where the error message should be shown
    });

const RegisterForm = () => {
  const isLoading = false;
  // Initialize useForm hook
  const form = useForm({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      re_password: '',
    },
  });

  // Handle form submission
  function onSubmit(values) {
    const { re_password, ...dataToSubmit } = values;
  
    //Auto adding role for new user
    dataToSubmit.role = 'user';
  
    // Post data to server
    axios.post('/api/register', dataToSubmit)
      .then(response => {
        console.log('User registered successfully:', response.data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <div className='flex items-center space-x-2'>
          <img className='custom-logo' src='/assets/icon/appIcon.svg' alt='logo'/>
          <span className='logo-text'>Fakebook</span>
        </div>
        <h2 className='h4-bold md:h3-bold pt-5 sm:pt-7'>Join us to share your moments</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>Create a new account</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='re_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='shad-button_primary'>
            {isLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : 'Sign up'}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>Already have an account?
            <Link to='/sign-in' className='text-primary-500 text-small-semibold ml-1'>Sign in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default RegisterForm;