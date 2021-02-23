import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import * as ROUTES from "../constants/routes";
import useTitle from "../hooks/useTitle";
import { useState } from "react";
import {
  IRegisterForm,
  OnChangeEventType,
  OnSubmitEventType,
} from "../interfaces";

function Register() {
  useTitle("Register");
  const [registerForm, setRegisterForm] = useState<IRegisterForm>({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const { username, fullname, email, password } = registerForm;
  const isValid =
    username !== "" && fullname !== "" && email !== "" && password !== "";

  const handleOnChange = (e: OnChangeEventType) => {
    const { name, value } = e.currentTarget;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleRegister = async (e: OnSubmitEventType) => {
    e.preventDefault();
  };

  return (
    <div className="container flex max-w-xs  mx-auto justify-center h-screen items-center">
      <div className="flex flex-col">
        <div className="flex flex-col bg-white items-center p-4 mb-4 border">
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          <form method="POST" onSubmit={handleRegister}>
            <input
              type="text"
              aria-label="Enter your username"
              className="text-sm text-gray-900 w-full py-5 px-4 h-2 border bg-gray-100 rounded mb-2"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleOnChange}
            />

            <input
              type="text"
              aria-label="Enter your full name"
              className="text-sm text-gray-900 w-full py-5 px-4 h-2 border bg-gray-100 rounded mb-2"
              placeholder="Full Name"
              name="fullname"
              value={fullname}
              onChange={handleOnChange}
            />

            <input
              type="email"
              aria-label="Enter your email address"
              className="text-sm text-gray-900 w-full py-5 px-4 h-2 border bg-gray-100 rounded mb-2"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={handleOnChange}
            />

            <input
              type="password"
              aria-label="Enter your password"
              className="text-sm text-gray-900 w-full py-5 px-4 h-2 border bg-gray-100 rounded mb-2"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
            />

            <button
              type="submit"
              disabled={!isValid}
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                !isValid && "opacity-50 cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
