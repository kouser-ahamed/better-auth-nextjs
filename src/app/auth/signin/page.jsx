"use client";

import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";

const SignInPage = () => {
   const [isVisible, setIsVisible] = useState(false);
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
          <TextField className="w-full max-w-[280px]" name="password">
            <Label>Password</Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full max-w-[280px]"
                type={isVisible ? "text" : "password"}
                placeholder="Your Password"
               
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
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
