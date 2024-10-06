import React from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useForm } from "react-hook-form";

function Myform() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Submitting the form", data);
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
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^it\d{5}@glbitm\.ac\.in$/,
                      message: 'Enter a valid glbitm.ac.in email (e.g., it2331@glbitm.ac.in)',
                    },
                  })}
                />
                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
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
                {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")} className="text-blue-600 cursor-pointer">
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
            </Tab>

            {/* Sign-up Tab */}
            <Tab key="sign-up" title="Sign up">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-[300px]">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

                <Input
                  label="Email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
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
                {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")} className="text-blue-600 cursor-pointer">
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
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
