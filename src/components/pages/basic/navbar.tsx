import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Track whether it's login or signup form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPricing, setShowPricing] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const togglePricing = () => {
    setShowPricing(!showPricing);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login or signup logic here based on isLogin state
    if (isLogin) {
      try {
        console.log(email, password);
        const userData = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (response.status === 200) {
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          setShowLogin(false);
          alert("User Logged in Successfully!");
          window.location.href = "./signedin_home";
        } else {
          alert("Something went wrong during SignIn!");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 404) {
            alert("Invalid email or password!");
          } else {
            console.error("Error during signin:", axiosError);
            alert("Something went wrong");
          }
        } else {
          console.error("Non-Axios error during signin:", error);
          alert("Something went wrong");
        }
      }
      setEmail("");
      setPassword("");
      setOtp("");
    } else {
      if (email !== "" && password !== "") {
        try {
          console.log(email);
          const userData = {
            email: email,
          };
          const response = await axios.post(
            "http://localhost:3000/api/v1/users/sendOTP",
            userData,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          if (response.status === 200) {
            alert("An OTP has been sent to your Email address!");
            setOtp("");
            setIsOTP(true);
          } else {
            alert("Something went wrong during sending OTP");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 500) {
              alert("Failed to generate OTP!");
            } else {
              console.error("Error during sending OTP:", axiosError);
              alert("Something went wrong");
            }
          } else {
            console.error("Non-Axios error during sending OTP", error);
            alert("Something went wrong");
          }
        }
      }
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length === 5) {
      try {
        console.log(email, password);
        const userData = {
          name: "unknown",
          email: email,
          password: password,
          type: "customer",
          otp: otp,
        };
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/signup",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.status === 201) {
          setShowLogin(true);
          setIsLogin(true);
          alert("User Registered Successfully!");
        } else {
          alert("Something went wrong during registering user");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 404) {
            alert("User already exists!");
          } else {
            console.error("Error during registration:", error);
            alert("Something went wrong");
          }
        } else {
          console.error("Non-Axios error during SignUp:", error);
          alert("Something went wrong");
        }
      }
    }
    setIsOTP(false);
    setEmail("");
    setPassword("");
    setOtp("");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup form
    setEmail("");
    setPassword("");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl text-sky-500 font-bold mr-4">WherePromo</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <div
          className="text-gray-700 hover:text-blue-500"
          onClick={togglePricing}
        >
          Pricing
        </div>
        <Link to="/about" className="text-gray-700 hover:text-blue-500">
          About
        </Link>
        <Link to="/articles" className="text-gray-700 hover:text-blue-500">
          Articles
        </Link>
        <Link to="/maps" className="text-gray-700 hover:text-blue-500">
          Maps
        </Link>
      </div>

      <div>
        <button
          className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2"
          onClick={toggleLogin}
        >
          Login to Account
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center px-20 py-16 max-w-lg text-base bg-white rounded-3xl max-md:px-5">
              <div className="mt-5 text-4xl font-bold tracking-tighter text-sky-500 leading-[49px]">
                {isLogin ? "Login" : "Sign Up"}
              </div>
              <div className="flex gap-5 justify-between px-4 py-3.5 mt-16 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px] max-md:mt-10">
                <div className="self-start mt-3">Email</div>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex gap-5 justify-between px-4 py-4 mt-8 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px]">
                <div className="my-auto">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-4 text-sm text-cyan-900">
                {isLogin ? "Forgot password?" : ""}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 mt-8"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <div className="mt-4 text-base">
                {isLogin ? "New here? " : "Already have an account? "}
                <button
                  type="button"
                  className="text-sky-600 underline"
                  onClick={toggleForm}
                >
                  {isLogin ? "Register Now!" : "Login Here"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {showPricing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center px-8 py-6 max-w-lg text-base bg-white rounded-3xl max-md:px-5 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={togglePricing}
            >
              x
            </button>
            <div className="mt-2 text-2xl font-bold tracking-tighter text-sky-500 leading-[30px]">
              Get Premium Today!
            </div>
            <div className="mt-4 w-full text-base tracking-wider leading-6 text-stone-500">
              Join today to get some amazing features like:
            </div>
            <div className="flex flex-col px-4 mt-4 w-full">
              <div className="text-base tracking-wider leading-6 text-black">
                Advanced AI assistance
              </div>
              <div className="mt-2 text-base tracking-wider leading-6 text-black">
                Tailored Grocery Shop Lists
              </div>
              <div className="mt-2 text-base tracking-wider leading-6 text-black">
                User-Driven Contribution Rewards
              </div>
              <div className="flex justify-between mt-6 w-full">
                <div className="text-xl font-bold tracking-tighter text-right text-blue-500">
                  €9.90
                </div>
                <div className="text-lg tracking-wider text-gray-700">/mon</div>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2">
                Get Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {isOTP && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleOTPSubmit}>
            <div className="flex flex-col items-center px-20 py-16 max-w-lg text-base bg-white rounded-3xl max-md:px-5">
              <div className="mt-5 text-4xl font-bold tracking-tighter text-sky-500 leading-[49px]">
                One Time Password
              </div>
              OTP is valid for only 5 minutes!
              <div className="flex gap-5 justify-between px-4 py-3.5 mt-16 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px] max-md:mt-10">
                <div className="self-start mt-3">OTP</div>
                <input
                  type="number"
                  value={otp}
                  onChange={handleOTPChange}
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  placeholder="Enter your OTP"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 mt-8"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
