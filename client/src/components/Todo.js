import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleCard from "./Card";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

const Todo = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [openNav, setOpenNav] = React.useState(false);

  const handleLogOut = () => {
    // first delete all cookies
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    // go back to login
    navigate("/");
    console.log(token);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    const cookies = document.cookie.split(";");

    if (cookies.length === 0) {
      navigate("/");
      return;
    }

    let tmpToken;
    cookies.forEach((val) => {
      if (val.includes("token")) {
        tmpToken = val.split("=")[1];
      }
    });

    if (tmpToken) {
      setToken(tmpToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography className="mr-4 cursor-pointer py-1.5 font-black">
            BlackShip TL
          </Typography>
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={handleLogOut}
            >
              <span>Log Out</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="container mx-auto">
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className=""
                onClick={handleLogOut}
              >
                <span>Log Out</span>
              </Button>
            </div>
          </div>
        </Collapse>
      </Navbar>

      {token ? <SimpleCard token={token} /> : <></>}
    </div>
  );
};

export default Todo;
