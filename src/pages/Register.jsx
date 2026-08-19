import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHospital,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "patient",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Name Validation
    if (!/^[A-Za-z ]{3,30}$/.test(form.name)) {
      alert("Name should contain only letters");
      return;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Enter a valid Email Address");
      return;
    }

    // Phone Validation
    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // Password Validation
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // Confirm Password
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          password: form.password,
        }
      );

      alert(res.data.message || "Registration Successful ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-cyan-500 to-sky-400 flex items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-800 to-cyan-600 text-white p-10">
          <FaHospital className="text-7xl mb-5" />

          <h1 className="text-5xl font-bold">
            Smart Hospital
          </h1>

          <p className="mt-5 text-center text-lg">
            AI Smart Hospital Queue
            <br />
            Management System
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="text-4xl font-bold text-center text-blue-700">
            Create Account
          </h2>

          <form
            onSubmit={registerUser}
            className="space-y-5 mt-8"
          >
            {/* Name */}
            <div className="flex items-center border rounded-xl px-3">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-xl px-3">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded-xl px-3">
              <FaPhone className="text-gray-500" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>

            {/* Role */}
            <div className="flex items-center border rounded-xl px-3">
              <FaUserShield className="text-gray-500" />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div className="flex items-center border rounded-xl px-3">
              <FaLock className="text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border rounded-xl px-3">
              <FaLock className="text-gray-500" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="text-gray-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg font-bold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?

            <Link
              to="/login"
              className="text-blue-700 font-bold ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;