import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split(";");
    if (!cookies) {
      navigate("/");
      return;
    }

    var tmpToken;
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
  }, []);

  return <div>Todo</div>;
};

export default Todo;
