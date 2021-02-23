import { Link, useHistory } from "react-router-dom";
import useTitle from "../hooks/useTitle";

import * as ROUTES from "../constants/routes";

import iphoneWithProfile from "../images/iphone-with-profile.jpg";
import logo from "../images/logo.png";
import { useContext, useState } from "react";
import {
  ILoginForm,
  OnChangeEventType,
  OnSubmitEventType,
} from "../interfaces";
import FirebaseContext from "../context/firebase";

function Login() {
  useTitle("Login");
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const { email, password } = loginForm;
  const isValid: boolean = email.trim() !== "" && password.trim() !== "";

  const handleOnChange = (e: OnChangeEventType) => {
    const { name, value } = e.currentTarget;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async (e: OnSubmitEventType) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoginForm({ email: "", password: "" });
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setLoginForm({ email: "", password: "" });
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src={iphoneWithProfile} alt="Iphone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="text-xs w-full text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              type="email"
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              placeholder="Email Address"
              name="email"
              onChange={handleOnChange}
              value={email}
            />

            <input
              type="password"
              aria-label="Enter your password"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
              value={password}
            />

            <button
              disabled={!isValid}
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                !isValid && "opacity-50 cursor-not-allowed"
              }`}
            >
              Login
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={ROUTES.REGISTER} className="font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
