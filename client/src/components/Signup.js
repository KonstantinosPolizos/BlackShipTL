import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await axios.post("http://localhost:8000/api/users/sign-up", {
        email: email,
        name: name,
        password: password,
        rePassword: rePassword,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      navigate("/");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col mt-20 items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="text-center">
          <Typography variant="h4" color="blue-gray">
            BlackShip TL Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Hello, want to become new user in todo list?
          </Typography>
        </div>
        <form
          className="mt-5 mb-10 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="h6" color="blue-gray" className="">
              Your Name
            </Typography>
            <Input
              size="sm"
              placeholder="exampleName"
              value={name}
              onChange={(e) => handleNameChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="">
              Your Email
            </Typography>
            <Input
              size="sm"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="">
              Type your Password
            </Typography>
            <Input
              type="password"
              size="sm"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="">
              Retype your Password
            </Typography>
            <Input
              type="password"
              size="sm"
              value={rePassword}
              onChange={(e) => handleRePasswordChange(e)}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-3" fullWidth type="submit">
            sign up
          </Button>
          <Link to="/">
            <Typography
              color="black"
              className="mt-4 text-right font-normal hover:underline"
            >
              Go back to login
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

export default Signup;
