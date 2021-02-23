import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import * as ROUTES from "../constants/routes";
import useTitle from "../hooks/useTitle";
import { useContext, useState } from "react";
import {
  IRegisterForm,
  OnChangeEventType,
  OnSubmitEventType,
} from "../interfaces";
import FirebaseContext from "../context/firebase";
import doesUsernameExist from "../services/firebase";

function Register() {
  useTitle("Register");
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [registerForm, setRegisterForm] = useState<IRegisterForm>({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  let { username, fullname, email, password } = registerForm;
  const isValid =
    username.trim() !== "" &&
    fullname.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    password.trim().length >= 6;

  const handleOnChange = (e: OnChangeEventType) => {
    const { name, value } = e.currentTarget;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleRegister = async (e: OnSubmitEventType) => {
    e.preventDefault();

    username = username.toLowerCase();
    email = email.toLowerCase();
    setError("");
    setIsProcessing(true);

    const usernameExist = await doesUsernameExist(username);

    if (usernameExist.length) {
      setIsProcessing(false);
      setError("Username already exist.");
      setRegisterForm({ ...registerForm, username: "" });
      return;
    }

    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await userCredentials.user?.updateProfile({ displayName: username });
      await firebase.firestore().collection("users").add({
        userId: userCredentials.user?.uid,
        username,
        fullname,
        email,
        following: [],
        followers: [],
        dateCreated: Date.now(),
      });

      setIsProcessing(false);
      setRegisterForm({ username: "", fullname: "", email: "", password: "" });
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setIsProcessing(false);
      setRegisterForm({ username: "", fullname: "", email: "", password: "" });
      setError(error.message);
    }
  };

  return (
    <div className="container flex max-w-xs  mx-auto justify-center h-screen items-center">
      <div className="flex flex-col">
        <div className="flex flex-col bg-white items-center p-4 mb-4 border">
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="text-xs w-full text-red-500 mb-4">{error}</p>}

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
              disabled={!isValid || isProcessing}
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                (!isValid || isProcessing) && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isProcessing ? "Processing..." : "Register"}
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
