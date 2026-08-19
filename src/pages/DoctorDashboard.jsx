import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import {
  FaUserMd,
  FaUsers,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaForward,
  FaSignOutAlt,
  FaWifi,
  FaExclamationTriangle,
  FaHospital,
  FaStethoscope,
} from "react-icons/fa";

function DoctorDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // DOCTOR DATA
  // =====================================================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  // =====================================================
  // HOSPITAL / DOCTOR DETAILS
  // =====================================================

  const hospital =
    user.hospital ||
    "Apollo Hospital, Chennai";

  const doctorName =
    user.name ||
    "Dr. Arjun Kumar";

  const department =
    user.department ||
    "Cardiology";

  // =====================================================
  // QUEUE STATES
  // =====================================================

  const [currentToken, setCurrentToken] =
    useState("A094");

  const [waitingPatients, setWaitingPatients] =
    useState(8);

  const [completedPatients, setCompletedPatients] =
    useState(12);

  const [averageTime, setAverageTime] =
    useState(10);

  const [isConnected, setIsConnected] =
    useState(false);

  // =====================================================
  // SOCKET.IO
  // =====================================================

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log(
        "🟢 Doctor Socket Connected:",
        socket.id
      );

      setIsConnected(true);

      socket.emit(
        "joinQueue",
        hospital
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "🔴 Doctor Socket Disconnected"
      );

      setIsConnected(false);
    });

    socket.on(
      "queueUpdated",
      (queueData) => {
        console.log(
          "📢 Doctor Queue Update:",
          queueData
        );

        if (
          queueData.people !== undefined
        ) {
          setWaitingPatients(
            queueData.people
          );
        }

        if (
          queueData.currentServing
        ) {
          setCurrentToken(
            queueData.currentServing
          );
        }

        if (
          queueData.averageTime !== undefined
        ) {
          setAverageTime(
            queueData.averageTime
          );
        }
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [hospital]);

  // =====================================================
  // CALL NEXT PATIENT
  // =====================================================

  const callNextPatient = () => {
    if (waitingPatients <= 0) {
      alert(
        "🎉 No patients waiting in the queue."
      );
      return;
    }

    const currentNumber =
      Number(
        currentToken.substring(1)
      );

    const nextToken =
      "A" + (currentNumber + 1);

    setCurrentToken(nextToken);

    setWaitingPatients(
      (prev) =>
        Math.max(prev - 1, 0)
    );

    alert(
      `📢 Patient ${nextToken} has been called.`
    );
  };

  // =====================================================
  // COMPLETE CONSULTATION
  // =====================================================

  const completeConsultation = () => {
    setCompletedPatients(
      (prev) => prev + 1
    );

    alert(
      "✅ Consultation completed successfully."
    );
  };

  // =====================================================
  // SKIP PATIENT
  // =====================================================

  const skipPatient = () => {
    if (waitingPatients <= 0) {
      alert(
        "No patient available to skip."
      );
      return;
    }

    setWaitingPatients(
      (prev) =>
        Math.max(prev - 1, 0)
    );

    const currentNumber =
      Number(
        currentToken.substring(1)
      );

    setCurrentToken(
      "A" + (currentNumber + 1)
    );

    alert(
      "⏭️ Patient skipped successfully."
    );
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert(
      "Logged out successfully 👋"
    );

    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="bg-gradient-to-r from-blue-800 to-cyan-600 text-white px-6 md:px-10 py-4 shadow-lg">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}

          <div>

            <h1 className="text-2xl md:text-3xl font-bold">
              🏥 Smart Hospital
            </h1>

            <p className="text-blue-100 text-sm">
              Doctor Control Panel
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-4">

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
                  Live Connected
                </>
              ) : (
                <>
                  <FaExclamationTriangle />
                  Offline
                </>
              )}

            </div>

            {/* DOCTOR ICON */}

            <FaUserMd className="text-3xl" />

            {/* LOGOUT */}

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
            >
              <FaSignOutAlt />
              <span className="hidden md:block">
                Logout
              </span>
            </button>

          </div>

        </div>

      </nav>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="max-w-7xl mx-auto p-6 md:p-8">

        {/* =================================================
            WELCOME
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-7">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="bg-blue-100 p-4 rounded-2xl">
                  <FaUserMd className="text-4xl text-blue-700" />
                </div>

                <div>

                  <h2 className="text-3xl font-bold text-gray-800">
                    Welcome, {doctorName} 👨‍⚕️
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Manage your patient queue
                    efficiently.
                  </p>

                </div>

              </div>

            </div>

            <div className="text-right">

              <p className="text-gray-500">
                Department
              </p>

              <p className="text-xl font-bold text-blue-700">
                {department}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            HOSPITAL INFO
        ================================================= */}

        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-3xl shadow-xl p-6 mt-8">

          <div className="flex items-center gap-4">

            <FaHospital className="text-4xl" />

            <div>

              <p className="text-blue-100">
                Hospital
              </p>

              <h2 className="text-2xl font-bold">
                {hospital}
              </h2>

            </div>

          </div>

        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          {/* CURRENT TOKEN */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <FaTicketAlt className="text-5xl text-purple-600" />

            <p className="text-gray-500 mt-4">
              Current Token
            </p>

            <h2 className="text-4xl font-bold text-purple-700 mt-2">
              {currentToken}
            </h2>

          </div>

          {/* WAITING */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <FaUsers className="text-5xl text-orange-500" />

            <p className="text-gray-500 mt-4">
              Waiting Patients
            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              {waitingPatients}
            </h2>

          </div>

          {/* COMPLETED */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <FaCheckCircle className="text-5xl text-green-600" />

            <p className="text-gray-500 mt-4">
              Completed Today
            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-2">
              {completedPatients}
            </h2>

          </div>

          {/* AVG TIME */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <FaClock className="text-5xl text-blue-600" />

            <p className="text-gray-500 mt-4">
              Average Consultation
            </p>

            <h2 className="text-4xl font-bold text-blue-700 mt-2">
              {averageTime}
              <span className="text-xl ml-1">
                min
              </span>
            </h2>

          </div>

        </div>

        {/* =================================================
            CURRENT PATIENT
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <div className="flex items-center gap-3">

            <FaStethoscope className="text-3xl text-blue-700" />

            <h2 className="text-2xl font-bold">
              Current Patient
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div className="bg-blue-50 rounded-2xl p-7 text-center">

              <p className="text-gray-500">
                Currently Serving
              </p>

              <h1 className="text-6xl font-bold text-blue-700 mt-3">
                {currentToken}
              </h1>

            </div>

            <div className="bg-orange-50 rounded-2xl p-7 text-center">

              <p className="text-gray-500">
                Patients Waiting
              </p>

              <h1 className="text-6xl font-bold text-orange-600 mt-3">
                {waitingPatients}
              </h1>

            </div>

          </div>

        </div>

        {/* =================================================
            QUEUE CONTROLS
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Queue Control
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {/* CALL NEXT */}

            <button
              onClick={callNextPatient}
              className="bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition"
            >

              <FaUsers />

              Call Next Patient

            </button>

            {/* COMPLETE */}

            <button
              onClick={completeConsultation}
              className="bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition"
            >

              <FaCheckCircle />

              Complete Consultation

            </button>

            {/* SKIP */}

            <button
              onClick={skipPatient}
              className="bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition"
            >

              <FaForward />

              Skip Patient

            </button>

          </div>

        </div>

        {/* =================================================
            QUEUE STATUS
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Live Queue Status
          </h2>

          <div
            className={`p-6 rounded-2xl border-l-4 ${
              waitingPatients === 0
                ? "bg-green-100 border-green-600"
                : "bg-blue-100 border-blue-600"
            }`}
          >

            {waitingPatients === 0 ? (

              <div>

                <h3 className="text-xl font-bold text-green-700">
                  🎉 Queue Completed
                </h3>

                <p className="mt-2">
                  There are no waiting patients.
                </p>

              </div>

            ) : (

              <div>

                <h3 className="text-xl font-bold text-blue-700">
                  👥 Patients are waiting
                </h3>

                <p className="mt-2">
                  {waitingPatients} patients
                  are currently waiting.

                </p>

              </div>

            )}

          </div>

        </div>

        {/* =================================================
            FOOTER INFO
        ================================================= */}

        <div className="text-center mt-10 pb-5">

          <p className="text-gray-500">
            AI Smart Hospital Queue
            Management System
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Real-time Doctor Queue Control
          </p>

        </div>

      </main>

    </div>
  );
}

export default DoctorDashboard;