import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const cookies = document.cookie.split(";");
      if (!cookies) return;

      var changeToken;
      cookies.forEach((val) => {
        if (val.includes("change-token")) {
          changeToken = val.split("=")[1];
        }
      });

      if (!changeToken) return;

      const res = await axios.put(
        "http://localhost:8000/api/users/change-password",
        {
          password: password,
          confirmPassword: rePassword,
        },
        {
          headers: {
            Authorization: `Bearer ${changeToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPassword("");
      setRePassword("");
      navigate("/");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    const token = window.location.href.split("?token=")[1];

    if (token) {
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 5 * 60 * 1000);

      const expires = expirationDate.toUTCString();
      const cookieString = `change-token=${token}; expires=${expires}; path=/change-password`;

      // Set the cookie
      document.cookie = cookieString;
    }
  }, []);

  return (
    <div className="flex flex-col mt-20 items-center h-screen">
      <Card color="transparent" shadow={false}>
        <div className="text-center">
          <Typography variant="h4" color="blue-gray">
            BlackShip TL Change Password
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Please change password for your security.
          </Typography>
        </div>
        <form
          className="mt-5 mb-10 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="h6" color="blue-gray" className="">
              Type Password
            </Typography>
            <Input
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              size="sm"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="">
              Retype Password
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
          <Button className="mt-6" fullWidth type="submit">
            change password
          </Button>
          <Link to="/sign-up">
            <Typography
              color="black"
              className="mt-4 text-right font-normal hover:underline"
            >
              Don't you have an account?
            </Typography>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
