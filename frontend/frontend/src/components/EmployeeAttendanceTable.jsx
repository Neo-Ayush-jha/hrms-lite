import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios";

export default function EmployeeAttendanceTable({ reload }) {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    const empRes = await api.get("employees/");
    const attRes = await api.get("attendance/");
    setEmployees(empRes.data);
    setAttendance(attRes.data);
  };

  const getTodayAttendance = (empId) => {
    return attendance.find(
      (a) => a.employee === empId && a.date === today
    );
  };

  const markTodayAttendance = async (empId, status) => {
    try {
      await api.post("attendance/", {
        employee: empId,
        date: today,
        status,
      });
      toast.success(`Marked ${status}`);
      fetchData();
    } catch {
      toast.error("Attendance already marked");
    }
  };

  const openAttendanceModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const employeeAttendance = attendance.filter(
    (a) => a.employee === selectedEmployee?.id
  );

  if (!employees.length)
    return <p className="text-gray-400">No employees found</p>;

  return (
    <>
      <div className="bg-white rounded-xl shadow">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden sm:table-cell">Dept</th>
              <th>Status (Today)</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => {
              const record = getTodayAttendance(e.id);
              const status = record ? record.status : "Not Marked";

              return (
                <tr
                  key={e.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td
                    title={e.full_name}
                    className="p-3 font-medium truncate max-w-[120px]"
                  >
                    {e.full_name}
                  </td>

                  <td
                    title={e.email}
                    className="hidden md:table-cell truncate max-w-[200px]"
                  >
                    {e.email}
                  </td>

                  <td className="hidden sm:table-cell truncate max-w-[120px]">
                    {e.department}
                  </td>

                  <td className="text-sm">
                    {record ? (
                      <div>
                        <span
                          className={
                            status === "Present"
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {status}
                        </span>
                        <div className="text-xs text-gray-400">
                          {record.date}
                        </div>

                        <div className="sm:hidden text-xs text-gray-500 mt-1">
                          Dept: {e.department}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Not Marked
                      </span>
                    )}
                  </td>

                  <td className="text-center">
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      {status === "Not Marked" ? (
                        <>
                          <button
                            onClick={() =>
                              markTodayAttendance(e.id, "Present")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                          >
                            Present
                          </button>

                          <button
                            onClick={() =>
                              markTodayAttendance(e.id, "Absent")
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                          >
                            Absent
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs px-3 py-1 bg-gray-100 rounded">
                          Locked
                        </span>
                      )}

                      <button
                        onClick={() => openAttendanceModal(e)}
                        className="border border-blue-500 text-blue-600 px-3 py-1 rounded text-xs hover:bg-blue-50"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">
                  Attendance Details
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedEmployee.full_name}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              {employeeAttendance.length ? (
                <div className="max-h-72 overflow-y-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeAttendance.map((a) => (
                        <tr
                          key={a.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="p-2">{a.date}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                a.status === "Present"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center">
                  No attendance records found
                </p>
              )}
            </div>

            <div className="flex justify-end px-5 py-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
