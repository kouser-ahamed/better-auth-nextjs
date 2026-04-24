"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    console.log("Sign in success:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>

        <Form
          method="post"
          action="#"
          className="flex w-96 flex-col gap-4"
          onSubmit={onSubmit}
        >
          {/* EMAIL */}
          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input placeholder="Your Email" />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField name="password" type="password" isRequired>
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* BUTTONS */}
          <div className="flex gap-2">
            <Button type="submit">
              <Check />
              Submit
            </Button>

            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;