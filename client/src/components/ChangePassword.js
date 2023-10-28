import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const ChangePassword = () => {
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
        <form className="mt-5 mb-10 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="h6" color="blue-gray" className="">
              Type Password
            </Typography>
            <Input
              type="password"
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
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            onClick={() => console.log("hello world")}
          >
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
