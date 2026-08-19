import {
  FaHospital,
  FaUserMd,
  FaUsers,
  FaClipboardList,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          🏥 Smart Hospital
        </h1>

        <ul className="space-y-5">

          <li className="hover:bg-blue-600 rounded-lg p-3 cursor-pointer flex items-center gap-3">
            <FaChartLine />
            Dashboard
          </li>

          <li className="hover:bg-blue-600 rounded-lg p-3 cursor-pointer flex items-center gap-3">
            <FaHospital />
            Hospitals
          </li>

          <li className="hover:bg-blue-600 rounded-lg p-3 cursor-pointer flex items-center gap-3">
            <FaUserMd />
            Doctors
          </li>

          <li className="hover:bg-blue-600 rounded-lg p-3 cursor-pointer flex items-center gap-3">
            <FaUsers />
            Patients
          </li>

          <li className="hover:bg-blue-600 rounded-lg p-3 cursor-pointer flex items-center gap-3">
            <FaClipboardList />
            Queue
          </li>

          <li className="hover:bg-blue-600 rounded-lg p-3 cursor-pointer flex items-center gap-3">
            <FaCog />
            Settings
          </li>

        </ul>

        <button className="mt-20 w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-3">
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* Top Bar */}

        <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">
              Welcome Admin 👋
            </h2>

            <p className="text-gray-500">
              AI Smart Hospital Queue Management System
            </p>

          </div>

          <div className="flex items-center gap-6">

            <FaBell className="text-2xl cursor-pointer text-blue-700" />

            <img
              src="https://i.pravatar.cc/100"
              className="w-12 h-12 rounded-full"
              alt=""
            />

          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaHospital className="text-5xl text-blue-600" />
            <h1 className="text-4xl font-bold mt-4">15</h1>
            <p className="text-gray-500">Hospitals</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaUserMd className="text-5xl text-green-600" />
            <h1 className="text-4xl font-bold mt-4">120</h1>
            <p className="text-gray-500">Doctors</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaUsers className="text-5xl text-purple-600" />
            <h1 className="text-4xl font-bold mt-4">1500</h1>
            <p className="text-gray-500">Patients</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaClipboardList className="text-5xl text-red-500" />
            <h1 className="text-4xl font-bold mt-4">89</h1>
            <p className="text-gray-500">Today's Queue</p>
          </div>

        </div>

        {/* Analytics */}

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Queue Analytics
            </h2>

            <div className="space-y-5">

              <div>
                <p>Current Queue</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full w-3/4"></div>
                </div>
              </div>

              <div>
                <p>Completed Today</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-green-500 h-4 rounded-full w-2/3"></div>
                </div>
              </div>

              <div>
                <p>Average Waiting Time</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-orange-500 h-4 rounded-full w-1/2"></div>
                </div>
              </div>

            </div>

          </div>

          {/* Activity */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Recent Activities
            </h2>

            <ul className="space-y-4">

              <li className="border-b pb-2">
                ✅ New Patient Registered
              </li>

              <li className="border-b pb-2">
                🩺 Doctor Added Successfully
              </li>

              <li className="border-b pb-2">
                🏥 New Hospital Added
              </li>

              <li className="border-b pb-2">
                📋 Queue Updated
              </li>

              <li>
                🔔 Notification Sent
              </li>

            </ul>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-4 gap-5">

            <button className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700">
              Add Hospital
            </button>

            <button className="bg-green-600 text-white py-4 rounded-xl hover:bg-green-700">
              Add Doctor
            </button>

            <button className="bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700">
              Manage Patients
            </button>

            <button className="bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600">
              Generate Report
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;