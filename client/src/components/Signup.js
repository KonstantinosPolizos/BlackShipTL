import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";

const Signup = () => {
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
        <form className="mt-5 mb-10 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-2">
            <Typography variant="h6" color="blue-gray" className="">
              Your Name
            </Typography>
            <Input
              size="sm"
              placeholder="exampleName"
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
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  -mt-5"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree with the
                <Typography className="font-medium hover:underline">
                  &nbsp;Terms and Conditions.
                </Typography>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-3"
            fullWidth
            onClick={() => console.log("hello world")}
          >
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
