import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================

  const loginUser = async (e) => {
    e.preventDefault();

    // ================= BASIC VALIDATION =================

    if (!form.email || !form.password) {
      alert("Please enter Email and Password");
      return;
    }

    // ================= EMAIL VALIDATION =================

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Enter a valid Email Address");
      return;
    }

    try {
      // ================= BACKEND LOGIN =================

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // ================= GET USER =================

      const user = res.data.user;

      // Safety check
      if (!user || !user.role) {
        alert("Invalid user information received from server");
        return;
      }

      // ================= ROLE CHECK =================
      // Database role MUST match selected Login As role

      if (user.role !== form.role) {
        const selectedRole =
          form.role.charAt(0).toUpperCase() +
          form.role.slice(1);

        const actualRole =
          user.role.charAt(0).toUpperCase() +
          user.role.slice(1);

        alert(
          `This email is registered as ${actualRole}.\n\n` +
          `${selectedRole} login is not allowed with this email.\n\n` +
          `Please select "${actualRole}" to login.`
        );

        return;
      }

      // ================= SAVE LOGIN DATA =================

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // ================= SUCCESS MESSAGE =================

      alert("Login Successful ✅");

      // ================= ROLE BASED DASHBOARD =================

      if (user.role === "patient") {
        navigate("/dashboard");
      }

      else if (user.role === "doctor") {
        navigate("/doctor");
      }

      else if (user.role === "admin") {
        navigate("/admin");
      }

      else {
        alert("Invalid user role");
      }

    } catch (err) {
      console.log("Login Error:", err);

      alert(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-500 flex items-center justify-center px-5">

      <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

        {/* ================= LEFT SIDE ================= */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-12">

          <FaHospital className="text-8xl mb-6" />

          <h1 className="text-5xl font-bold">
            Smart Hospital
          </h1>

          <p className="mt-5 text-center text-lg">
            AI Smart Hospital Queue
            <br />
            Management System
          </p>

          <img
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
            alt="Hospital"
            className="mt-10 rounded-2xl w-80 shadow-xl"
          />

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="p-10">

          <h2 className="text-4xl font-bold text-center text-blue-700">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Login to your account
          </p>

          <form
            onSubmit={loginUser}
            className="space-y-5 mt-8"
          >

            {/* ================= ROLE ================= */}

            <div>

              <label className="font-semibold">
                Login As
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-3">

                <FaUserShield className="text-blue-600" />

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                >

                  <option value="patient">
                    Patient
                  </option>

                  <option value="doctor">
                    Doctor
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

            </div>

            {/* ================= EMAIL ================= */}

            <div>

              <label className="font-semibold">
                Email
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-3">

                <FaEnvelope className="text-gray-500" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full p-3 outline-none"
                />

              </div>

            </div>

            {/* ================= PASSWORD ================= */}

            <div>

              <label className="font-semibold">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-3">

                <FaLock className="text-gray-500" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full p-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg font-bold transition"
            >
              Login
            </button>

          </form>

          {/* ================= REGISTER ================= */}

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-700 font-bold ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;