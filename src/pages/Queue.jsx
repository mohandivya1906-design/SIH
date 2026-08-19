import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AIPredictionCard from "../components/AIPredictionCard";
import { useNavigate } from "react-router-dom";
import {
  FaTicketAlt,
  FaHospital,
  FaUserMd,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaWifi,
  FaExclamationTriangle,
} from "react-icons/fa";

function Queue() {
  const navigate = useNavigate();

  // =====================================================
  // BOOKING DETAILS
  // =====================================================

  const booking =
    JSON.parse(localStorage.getItem("booking")) || {
      hospital: "Apollo Hospital, Chennai",
      doctor: "Dr. Arjun Kumar",
      department: "Cardiology",
      token: "A102",
    };

  // =====================================================
  // QUEUE STATES
  // =====================================================

  const [token] = useState(booking.token);

  const [people, setPeople] = useState(8);

  const [waitingTime, setWaitingTime] = useState(20);

  const [currentServing, setCurrentServing] =
    useState("A094");

  const [progress, setProgress] = useState(65);

  // Socket connection status
  const [isConnected, setIsConnected] =
    useState(false);

  // =====================================================
  // SOCKET.IO REAL-TIME CONNECTION
  // =====================================================

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // ---------------------------------------------------
    // SOCKET CONNECTED
    // ---------------------------------------------------

    socket.on("connect", () => {
      console.log(
        "🟢 Connected to Socket.IO:",
        socket.id
      );

      setIsConnected(true);

      // Join hospital queue
      socket.emit(
        "joinQueue",
        booking.hospital
      );
    });

    // ---------------------------------------------------
    // SOCKET DISCONNECTED
    // ---------------------------------------------------

    socket.on("disconnect", () => {
      console.log(
        "🔴 Socket.IO disconnected"
      );

      setIsConnected(false);
    });

    // ---------------------------------------------------
    // RECEIVE LIVE QUEUE UPDATE
    // ---------------------------------------------------

    socket.on(
      "queueUpdated",
      (queueData) => {
        console.log(
          "📢 Live Queue Update:",
          queueData
        );

        // Update people
        if (
          queueData.people !== undefined
        ) {
          setPeople(queueData.people);
        }

        // Update waiting time
        if (
          queueData.waitingTime !== undefined
        ) {
          setWaitingTime(
            queueData.waitingTime
          );
        }

        // Update current serving token
        if (
          queueData.currentServing
        ) {
          setCurrentServing(
            queueData.currentServing
          );
        }

        // Update progress
        if (
          queueData.progress !== undefined
        ) {
          setProgress(queueData.progress);
        }
      }
    );

    // ---------------------------------------------------
    // CLEANUP
    // ---------------------------------------------------

    return () => {
      socket.disconnect();
    };
  }, [booking.hospital]);

  // =====================================================
  // MANUAL REFRESH QUEUE
  // =====================================================

  const refreshQueue = () => {
    if (people > 0) {
      const newPeople = people - 1;

      const newWaitingTime =
        Math.max(waitingTime - 2, 0);

      const newProgress =
        Math.min(progress + 8, 100);

      const currentNo =
        Number(
          currentServing.substring(1)
        ) + 1;

      const newCurrentServing =
        "A" + currentNo;

      setPeople(newPeople);

      setWaitingTime(
        newWaitingTime
      );

      setProgress(newProgress);

      setCurrentServing(
        newCurrentServing
      );

      alert(
        "Queue Updated Successfully ✅"
      );
    } else {
      alert(
        "It is already your turn 🎉"
      );
    }
  };

  // =====================================================
  // CANCEL TOKEN
  // =====================================================

  const cancelToken = () => {
    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel your token?"
      );

    if (confirmCancel) {
      localStorage.removeItem(
        "booking"
      );

      alert(
        "Token Cancelled Successfully ✅"
      );

      navigate("/dashboard");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-3xl p-8 shadow-xl">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-4xl font-bold">
              Live Queue Status
            </h1>

            <p className="mt-3 text-lg">
              AI Smart Hospital Queue
              Management System
            </p>

          </div>

          {/* SOCKET STATUS */}

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
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

        </div>

      </div>


      {/* =================================================
          QUEUE CARDS
      ================================================= */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

        {/* TOKEN */}

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">

          <FaTicketAlt className="text-5xl text-blue-600 mx-auto" />

          <h3 className="mt-4 text-lg font-semibold">
            Your Token
          </h3>

          <h1 className="text-5xl font-bold text-blue-700 mt-2">
            {token}
          </h1>

        </div>


        {/* PEOPLE */}

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">

          <FaUsers className="text-5xl text-orange-500 mx-auto" />

          <h3 className="mt-4 text-lg font-semibold">
            People Before You
          </h3>

          <h1 className="text-5xl font-bold text-orange-600 mt-2">
            {people}
          </h1>

        </div>


        {/* WAITING TIME */}

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">

          <FaClock className="text-5xl text-green-600 mx-auto" />

          <h3 className="mt-4 text-lg font-semibold">
            Waiting Time
          </h3>

          <h1 className="text-4xl font-bold text-green-600 mt-2">
            {waitingTime} Min
          </h1>

        </div>


        {/* CURRENT SERVING */}

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">

          <FaCheckCircle className="text-5xl text-purple-600 mx-auto" />

          <h3 className="mt-4 text-lg font-semibold">
            Current Serving
          </h3>

          <h1 className="text-4xl font-bold text-purple-700 mt-2">
            {currentServing}
          </h1>

        </div>

      </div>


      {/* =================================================
          QUEUE DETAILS
      ================================================= */}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        {/* HOSPITAL DETAILS */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Hospital Details
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <FaHospital className="text-blue-600 text-2xl" />

              <span className="text-lg">
                {booking.hospital}
              </span>

            </div>


            <div className="flex items-center gap-3">

              <FaUserMd className="text-green-600 text-2xl" />

              <span className="text-lg">
                {booking.doctor}
              </span>

            </div>


            <div className="flex items-center gap-3">

              <FaClock className="text-orange-500 text-2xl" />

              <span className="text-lg">
                Average Consultation :
                10 Minutes
              </span>

            </div>

          </div>

        </div>


        {/* QUEUE PROGRESS */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Queue Progress
          </h2>

          <div className="mb-4">

            <div className="flex justify-between">

              <span>
                Progress
              </span>

              <span>
                {progress}%
              </span>

            </div>


            <div className="w-full bg-gray-200 rounded-full h-5 mt-2">

              <div
                className="bg-blue-600 h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>


          <div className="mt-8">

            <p className="text-lg">
              Estimated Turn
            </p>

            <h2 className="text-3xl font-bold text-blue-700 mt-2">

              {waitingTime <= 0
                ? "Now"
                : `${waitingTime} Minutes`}

            </h2>

          </div>

        </div>

      </div>


      {/* =================================================
          LIVE STATUS
      ================================================= */}

      <div className="bg-white rounded-2xl shadow-xl mt-8 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Live Status
        </h2>

        <div
          className={`p-5 rounded-xl border-l-4 ${
            people === 0
              ? "bg-green-100 border-green-600"
              : "bg-blue-100 border-blue-600"
          }`}
        >

          {people === 0
            ? "🎉 It's your turn. Please enter the consultation room."
            : `✅ ${people} patients before you. Please wait.`}

        </div>

      </div>


      {/* =================================================
          AI PREDICTION
      ================================================= */}

      <div className="mt-8">

        <AIPredictionCard
          peopleBefore={people}
        />

      </div>


      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* CANCEL */}

        <button
          onClick={cancelToken}
          className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-lg flex items-center justify-center gap-3 transition"
        >

          <FaTimesCircle />

          Cancel Token

        </button>


        {/* REFRESH */}

        <button
          onClick={refreshQueue}
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg transition"
        >

          Refresh Queue

        </button>

      </div>

    </div>
  );
}

export default Queue;