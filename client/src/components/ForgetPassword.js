import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await axios.post(process.env.ENDPOINT + "api/users/forget-password", {
        email: email,
      });

      setEmail("");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col mt-20 items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="text-center">
          <Typography variant="h4" color="blue-gray">
            BlackShip TL Reset
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Let us help you change your password
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
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-3" fullWidth type="submit">
            change password
          </Button>
          <Link to="/">
            <Typography
              color="black"
              className="mt-4 text-right font-normal hover:underline"
            >
              Go back to login
            </Typography>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
