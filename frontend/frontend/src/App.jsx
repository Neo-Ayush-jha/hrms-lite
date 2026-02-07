import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeAttendanceTable from "./components/EmployeeAttendanceTable";
import api from "./api/axios";

function App() {
  const [reload, setReload] = useState(false);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    api.get("employees/").then((res) => setEmployeesCount(res.data.length));
    api.get("attendance/").then((res) => setAttendanceCount(res.data.length));
  }, [reload]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-1">Welcome Admin</h2>
        <p className="text-gray-500 mb-6">
          Manage employees and mark attendance easily.
        </p>

        <Stats
          employees={employeesCount}
          attendance={attendanceCount}
        />

        {/* Employee Add Form */}
        <div className="mb-8">
          <EmployeeForm refresh={() => setReload(!reload)} />
        </div>

        {/* Single Employee + Attendance Table */}
        <EmployeeAttendanceTable reload={reload} />
      </div>
    </div>
  );
}

export default App;