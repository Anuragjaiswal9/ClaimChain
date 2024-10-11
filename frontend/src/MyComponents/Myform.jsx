import React from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Myform({  }) {

  const navigate = useNavigate();

  const handleLogin = () => {
    //setIsAuthenticated(true);
    navigate('/main'); // Redirect to the main page after login
  };

  // Separate useForm for login and sign-up
  const loginForm = useForm();
  const signUpForm = useForm();

  // Login form submission
  async function onLoginSubmit(data) {
  const response =   await axios.post("http://localhost:8000/api/v1/users/login", data);
    console.log(data); 
    handleLogin();

  }

  // Sign-up form submission
  async function onSubmit(data) {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register", data);
      console.log(response.data);  // Check the response from the API
    } catch (error) {
      console.error("Sign-up failed:", error);
      // Optionally, display error to the user
    }
  }

  const [selected, setSelected] = React.useState("login");

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            {/* Login Tab */}
            <Tab key="login" title="Login">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="flex flex-col gap-4">
                <Input
                  placeholder="Enter your email"
                  {...loginForm.register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^it\d{5}@glbitm\.ac\.in$/,
                      message: 'Enter a valid glbitm.ac.in email (e.g., it23331@glbitm.ac.in)',
                    },
                  })}
                />
                {/* Safely check if errors exist before accessing them */}
                {loginForm.formState.errors?.email && (
                  <p className='text-red-600'>{loginForm.formState.errors.email.message}</p>
                )}

                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...loginForm.register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Password must contain at least one letter and one number',
                    },
                  })}
                />
                {loginForm.formState.errors?.password && (
                  <p className='text-red-600'>{loginForm.formState.errors.password.message}</p>
                )}

                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")} className="text-blue-600 cursor-pointer">
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="success" type="submit" disabled={loginForm.formState.isSubmitting}>
                    {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
            </Tab>

            {/* Sign-up Tab */}
            <Tab key="sign-up" title="Sign up">
              <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-[300px]">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...signUpForm.register('fullName', { required: 'Name is required' })}
                />
                {signUpForm.formState.errors?.fullName && (
                  <p className='text-red-600'>{signUpForm.formState.errors.fullName.message}</p>
                )}

                <Input
                  label="Email"
                  placeholder="Enter your email"
                  {...signUpForm.register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^it\d{5}@glbitm\.ac\.in$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
                {signUpForm.formState.errors?.email && (
                  <p className='text-red-600'>{signUpForm.formState.errors.email.message}</p>
                )}

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  {...signUpForm.register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Password must contain at least one letter and one number',
                    },
                  })}
                />
                {signUpForm.formState.errors?.password && (
                  <p className='text-red-600'>{signUpForm.formState.errors.password.message}</p>
                )}

                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")} className="text-blue-600 cursor-pointer">
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="success" type="submit" disabled={signUpForm.formState.isSubmitting}>
                    {signUpForm.formState.isSubmitting ? 'Signing up...' : 'Sign up'}
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Myform;
