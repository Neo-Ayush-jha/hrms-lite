import { Users, CalendarCheck } from "lucide-react";

export default function Stats({ employees, attendance }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
        <Users className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Total Employees</p>
          <h2 className="text-xl font-bold">{employees}</h2>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
        <CalendarCheck className="text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Attendance Records</p>
          <h2 className="text-xl font-bold">{attendance}</h2>
        </div>
      </div>
    </div>
  );
}