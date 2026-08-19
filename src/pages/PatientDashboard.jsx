import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaTicketAlt,
  FaClock,
  FaHospital,
  FaUserMd,
  FaBell,
  FaHistory,
  FaCalendarCheck,
  FaUsers,
  FaRobot,
  FaWifi,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";

function PatientDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // USER DATA
  // =====================================================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  // =====================================================
  // BOOKING DATA
  // =====================================================

  const booking =
    JSON.parse(localStorage.getItem("booking")) || {
      hospital: "Apollo Hospital, Chennai",
      doctor: "Dr. Arjun Kumar",
      department: "Cardiology",
      token: "A102",
    };

  // =====================================================
  // STATES
  // =====================================================

  const [token, setToken] = useState(
    booking.token || "No Token"
  );

  const [people, setPeople] = useState(8);

  const [waitingTime, setWaitingTime] = useState(20);

  const [currentServing, setCurrentServing] =
    useState("A094");

  const [prediction, setPrediction] = useState(null);

  const [aiLoading, setAiLoading] =
    useState(true);

  const [isConnected, setIsConnected] =
    useState(false);

  // =====================================================
  // SOCKET.IO LIVE QUEUE
  // =====================================================

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log(
        "🟢 Patient Dashboard Socket Connected:",
        socket.id
      );

      setIsConnected(true);

      socket.emit(
        "joinQueue",
        booking.hospital
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "🔴 Patient Dashboard Socket Disconnected"
      );

      setIsConnected(false);
    });

    socket.on(
      "queueUpdated",
      (queueData) => {
        console.log(
          "📢 Dashboard Queue Update:",
          queueData
        );

        if (
          queueData.people !== undefined
        ) {
          setPeople(queueData.people);
        }

        if (
          queueData.waitingTime !== undefined
        ) {
          setWaitingTime(
            queueData.waitingTime
          );
        }

        if (
          queueData.currentServing
        ) {
          setCurrentServing(
            queueData.currentServing
          );
        }
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [booking.hospital]);

  // =====================================================
  // AI WAITING TIME PREDICTION
  // =====================================================

  useEffect(() => {
    const getPrediction = async () => {
      try {
        setAiLoading(true);

        const response = await axios.post(
          "http://localhost:5000/api/ai/predict-waiting-time",
          {
            peopleBefore: Number(people),
            averageConsultationTime: 10,
            doctorEfficiency: 80,
            emergencyPatients: 0,
          }
        );

        if (response.data.success) {
          setPrediction(
            response.data.prediction
          );
        }
      } catch (error) {
        console.error(
          "AI Prediction Error:",
          error
        );

        setPrediction(null);
      } finally {
        setAiLoading(false);
      }
    };

    getPrediction();
  }, [people]);

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert(
      "Logged Out Successfully 👋"
    );

    navigate("/login");
  };

  // =====================================================
  // NOTIFICATION
  // =====================================================

  const showNotification = () => {
    if (people === 0) {
      alert(
        "🎉 Your turn has arrived! Please visit the consultation room."
      );
    } else {
      alert(
        `🔔 You have ${people} patients before you.`
      );
    }
  };

  // =====================================================
  // BOOK TOKEN
  // =====================================================

  const bookToken = () => {
    navigate("/queue");
  };

  // =====================================================
  // CANCEL TOKEN
  // =====================================================

  const cancelToken = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel your token?"
      )
    ) {
      localStorage.removeItem("booking");

      setToken("No Token");
      setPeople(0);
      setWaitingTime(0);

      alert(
        "❌ Token Cancelled Successfully"
      );
    }
  };

  // =====================================================
  // VIEW PROFILE
  // =====================================================

  const viewProfile = () => {
    if (user && user.email) {
      alert(
        `Name : ${user.name}\nEmail : ${user.email}\nRole : ${user.role}`
      );
    } else {
      alert(
        "Profile information not found"
      );
    }
  };

  // =====================================================
  // VIEW QUEUE
  // =====================================================

  const viewQueue = () => {
    navigate("/queue");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-6 md:px-10 py-4 shadow-lg">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              🏥 Smart Hospital
            </h1>

            <p className="text-blue-100 text-sm">
              AI Queue Management
            </p>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-5">

            {/* SOCKET STATUS */}

            <div
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                isConnected
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >

              {isConnected ? (
                <>
                  <FaWifi />
                  Live
                </>
              ) : (
                <>
                  <FaExclamationTriangle />
                  Offline
                </>
              )}

            </div>

            {/* NOTIFICATION */}

            <FaBell
              className="text-2xl cursor-pointer hover:text-yellow-300 transition"
              onClick={showNotification}
              title="Notifications"
            />

            {/* PROFILE */}

            <FaUserCircle
              className="text-4xl cursor-pointer hover:text-yellow-300 transition"
              onClick={viewProfile}
              title="Profile"
            />

            {/* LOGOUT */}

            <button
              onClick={logout}
              className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="max-w-7xl mx-auto p-6 md:p-8">

        {/* WELCOME */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>

            <h2 className="text-4xl font-bold text-gray-800">
              Welcome{" "}
              {user.name
                ? user.name
                : "Patient"}{" "}
              👋
            </h2>

            <p className="text-gray-500 mt-2">
              Monitor your hospital queue
              in real-time.
            </p>

          </div>

          {/* LIVE BADGE */}

          <div
            className={`px-5 py-3 rounded-2xl font-semibold ${
              isConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >

            {isConnected
              ? "🟢 Live Queue Connected"
              : "🔴 Queue Offline"}

          </div>

        </div>

        {/* =================================================
            QUEUE SUMMARY
        ================================================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          {/* TOKEN */}

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition">

            <FaTicketAlt className="text-5xl text-blue-600 mx-auto" />

            <h3 className="mt-4 text-lg font-semibold text-center">
              Current Token
            </h3>

            <h1 className="text-4xl font-bold text-blue-700 mt-2 text-center">
              {token}
            </h1>

          </div>

          {/* PEOPLE */}

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition">

            <FaUsers className="text-5xl text-orange-500 mx-auto" />

            <h3 className="mt-4 text-lg font-semibold text-center">
              People Before You
            </h3>

            <h1 className="text-4xl font-bold text-orange-600 mt-2 text-center">
              {people}
            </h1>

          </div>

          {/* WAITING */}

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition">

            <FaClock className="text-5xl text-green-600 mx-auto" />

            <h3 className="mt-4 text-lg font-semibold text-center">
              Waiting Time
            </h3>

            <h1 className="text-3xl font-bold text-green-600 mt-2 text-center">
              {waitingTime} Min
            </h1>

          </div>

          {/* CURRENT SERVING */}

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition">

            <FaTicketAlt className="text-5xl text-purple-600 mx-auto" />

            <h3 className="mt-4 text-lg font-semibold text-center">
              Current Serving
            </h3>

            <h1 className="text-3xl font-bold text-purple-700 mt-2 text-center">
              {currentServing}
            </h1>

          </div>

        </div>

        {/* =================================================
            HOSPITAL + DOCTOR
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* HOSPITAL */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Hospital Details
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <FaHospital className="text-blue-600 text-3xl" />

                <div>
                  <p className="text-gray-500">
                    Hospital
                  </p>

                  <p className="font-bold text-lg">
                    {booking.hospital}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaUserMd className="text-green-600 text-3xl" />

                <div>
                  <p className="text-gray-500">
                    Doctor
                  </p>

                  <p className="font-bold text-lg">
                    {booking.doctor}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaClock className="text-orange-500 text-3xl" />

                <div>
                  <p className="text-gray-500">
                    Department
                  </p>

                  <p className="font-bold text-lg">
                    {booking.department}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* QUEUE STATUS */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Live Queue Status
            </h2>

            <div
              className={`p-6 rounded-2xl border-l-4 ${
                people === 0
                  ? "bg-green-100 border-green-600"
                  : "bg-blue-100 border-blue-600"
              }`}
            >

              <div className="flex items-center gap-4">

                <FaUsers className="text-3xl text-blue-600" />

                <div>

                  <p className="text-gray-600">
                    Patients Before You
                  </p>

                  <p className="text-3xl font-bold">
                    {people}
                  </p>

                </div>

              </div>

              <p className="mt-5 font-semibold">

                {people === 0
                  ? "🎉 It's your turn!"
                  : `Please wait. ${people} patients are ahead of you.`}

              </p>

            </div>

            <button
              onClick={viewQueue}
              className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition"
            >
              View Full Live Queue →
            </button>

          </div>

        </div>

        {/* =================================================
            AI PREDICTION
        ================================================= */}

        <div className="mt-8">

          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-3xl shadow-xl p-7">

            <div className="flex items-center gap-4">

              <div className="bg-white/20 p-4 rounded-2xl">
                <FaRobot className="text-4xl" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  AI Waiting Time Prediction
                </h2>

                <p className="text-blue-100">
                  Smart prediction based on
                  your current queue position
                </p>

              </div>

            </div>

            {aiLoading ? (

              <div className="mt-7 text-center">
                <p className="animate-pulse text-lg">
                  🤖 AI is analysing the queue...
                </p>
              </div>

            ) : prediction ? (

              <div className="mt-7">

                <div className="bg-white/15 rounded-2xl p-6">

                  <p className="text-blue-100">
                    Predicted Waiting Time
                  </p>

                  <h1 className="text-5xl font-bold mt-2">

                    {prediction.predictedTime}

                    <span className="text-2xl ml-2">
                      Minutes
                    </span>

                  </h1>

                </div>

                <div className="mt-5 bg-white/10 rounded-2xl p-5">

                  <div className="flex justify-between">

                    <span>
                      AI Confidence
                    </span>

                    <span className="font-bold">
                      {prediction.confidence}%
                    </span>

                  </div>

                  <div className="w-full bg-white/20 rounded-full h-3 mt-3">

                    <div
                      className="bg-white h-3 rounded-full transition-all duration-700"
                      style={{
                        width: `${prediction.confidence}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ) : (

              <div className="mt-6 bg-white/10 rounded-xl p-4">
                ⚠️ AI prediction unavailable.
              </div>

            )}

          </div>

        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <h2 className="text-2xl font-bold mt-10">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-6">

          <button
            onClick={bookToken}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 text-lg transition"
          >
            <FaCalendarCheck />
            View Live Queue
          </button>

          <button
            onClick={cancelToken}
            className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-lg transition"
          >
            Cancel Token
          </button>

          <button
            onClick={viewProfile}
            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg transition"
          >
            View Profile
          </button>

        </div>

        {/* =================================================
            RECENT VISITS
        ================================================= */}

        <div className="bg-white mt-10 p-6 rounded-2xl shadow-xl overflow-x-auto">

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaHistory />
            Recent Visits
          </h2>

          <table className="w-full mt-5 border-collapse">

            <thead>

              <tr className="bg-blue-600 text-white">

                <th className="p-3">
                  Date
                </th>

                <th className="p-3">
                  Doctor
                </th>

                <th className="p-3">
                  Department
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="text-center border-b">

                <td className="p-3">
                  12-Aug-2026
                </td>

                <td>
                  Dr. Kumar
                </td>

                <td>
                  Cardiology
                </td>

                <td className="text-green-600 font-bold">
                  Completed
                </td>

              </tr>

              <tr className="text-center border-b">

                <td className="p-3">
                  05-Aug-2026
                </td>

                <td>
                  Dr. Priya
                </td>

                <td>
                  Dermatology
                </td>

                <td className="text-green-600 font-bold">
                  Completed
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default PatientDashboard;