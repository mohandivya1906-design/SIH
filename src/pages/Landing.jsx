import { Link } from "react-router-dom";
import {
  FaHospital,
  FaUserMd,
  FaClock,
  FaHeartbeat,
  FaArrowRight,
} from "react-icons/fa";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-lg shadow-md sticky top-0">
        <div className="flex items-center gap-3">
          <FaHospital className="text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-700">
            Smart Hospital
          </h1>
        </div>

        <div className="flex gap-8 font-semibold">
          <a href="#features">Features</a>
          <a href="#doctors">Doctors</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 duration-300"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid md:grid-cols-2 items-center px-12 py-20">

        <div>

          <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
            AI Smart Hospital
            <span className="text-blue-600">
              {" "}Queue Management
            </span>
          </h1>

          <p className="text-gray-600 mt-8 text-lg leading-8">
            Book your hospital token online,
            reduce waiting time,
            receive live updates,
            and experience smart healthcare
            powered by Artificial Intelligence.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg flex items-center gap-3 hover:bg-blue-700"
            >
              Book Token
              <FaArrowRight />
            </Link>

            <button className="border border-blue-600 px-8 py-4 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white">
              Learn More
            </button>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
            alt="Hospital"
            className="rounded-3xl shadow-2xl w-[550px]"
          />

        </div>

      </section>
      <section id="features" className="py-20 px-12 bg-white">
  <h2 className="text-4xl font-bold text-center mb-10">Features</h2>
  <div className="grid md:grid-cols-3 gap-8">
    <div className="p-6 shadow-lg rounded-xl">
      <h3 className="text-xl font-bold">Online Token Booking</h3>
      <p>Book hospital tokens online without waiting.</p>
    </div>

    <div className="p-6 shadow-lg rounded-xl">
      <h3 className="text-xl font-bold">Live Queue</h3>
      <p>Track your live queue status in real time.</p>
    </div>

    <div className="p-6 shadow-lg rounded-xl">
      <h3 className="text-xl font-bold">AI Prediction</h3>
      <p>Estimate waiting time using AI.</p>
    </div>
  </div>
</section>
<section id="doctors" className="py-20 px-12 bg-gray-100">
  <h2 className="text-4xl font-bold text-center mb-10">Doctors</h2>
  <div className="grid md:grid-cols-3 gap-8">
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold">Dr. Kumar</h3>
      <p>Cardiologist</p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold">Dr. Priya</h3>
      <p>Dermatologist</p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold">Dr. Ravi</h3>
      <p>Orthopedic</p>
    </div>
  </div>
</section>
<section id="about" className="py-20 px-12">
  <h2 className="text-4xl font-bold text-center mb-6">About</h2>
  <p className="text-center text-lg">
    Smart Hospital Queue Management helps patients book tokens,
    reduce waiting time and monitor queues online.
  </p>
</section>
<section id="contact" className="py-20 px-12 bg-blue-600 text-white">
  <h2 className="text-4xl font-bold text-center mb-6">Contact</h2>
  <p className="text-center">Email : support@smarthospital.com</p>
  <p className="text-center">Phone : +91 9876543210</p>
</section>


      {/* Statistics */}

      <section className="grid md:grid-cols-4 gap-8 px-12 pb-16">

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <FaHospital className="text-5xl mx-auto text-blue-600" />
          <h2 className="text-4xl font-bold mt-4">120+</h2>
          <p>Hospitals</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <FaUserMd className="text-5xl mx-auto text-green-600" />
          <h2 className="text-4xl font-bold mt-4">540+</h2>
          <p>Doctors</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <FaHeartbeat className="text-5xl mx-auto text-red-500" />
          <h2 className="text-4xl font-bold mt-4">25K+</h2>
          <p>Patients</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <FaClock className="text-5xl mx-auto text-orange-500" />
          <h2 className="text-4xl font-bold mt-4">75%</h2>
          <p>Waiting Time Reduced</p>
        </div>

      </section>

    </div>
  );
}

export default Landing;