import React from "react";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
