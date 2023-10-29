import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post("http://localhost:8000/api/users/sign-in", {
        email: email,
        password: password,
      });

      const token = res.data.token;
      const now = new Date();
      const expirationDate = new Date(
        now.getTime() + parseInt(res.data.expires) * 60 * 1000
      );

      const expires = expirationDate.toUTCString();
      const cookieString = `token=${token}; expires=${expires}; path=/`;

      // Set the cookie
      document.cookie = cookieString;
      setEmail("");
      setPassword("");
      navigate("/notes");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col mt-20 items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="text-center">
          <Typography variant="h4" color="blue-gray">
            BlackShip TL Log In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back, please login to todo list.
          </Typography>
        </div>
        <form
          className="mt-5 mb-10 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="h6" color="blue-gray" className="">
              Your Email
            </Typography>
            <Input
              size="sm"
              placeholder="name@mail.com"
              value={email}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => handleEmailChange(e)}
            />
            <Typography variant="h6" color="blue-gray" className="">
              Password
            </Typography>
            <Input
              type="password"
              size="sm"
              value={password}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            login
          </Button>
          <Link to="/sign-up">
            <Typography
              color="black"
              className="mt-4 text-right font-normal hover:underline"
            >
              Don't you have an account?
            </Typography>
          </Link>
          <Link to="/forget-password">
            <Typography
              color="black"
              className="mt-1 text-right font-normal hover:underline"
            >
              Did you forgot your passoword?
            </Typography>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Login;
