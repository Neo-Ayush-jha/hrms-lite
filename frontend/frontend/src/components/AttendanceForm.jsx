import { CalendarCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { useEffect, useState } from "react";

export default function AttendanceForm({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    api.get("employees/").then((res) => setEmployees(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("attendance/", data);
    toast.success("Attendance saved");
    refresh();
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <CalendarCheck className="text-green-600" /> Mark Attendance
      </h3>

      <form onSubmit={submit}>
        <select
          className="w-full border p-2 rounded mb-3"
          required
          onChange={(e) => setData({ ...data, employee: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded mb-3"
          required
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <CalendarCheck size={16} /> Save
        </button>
      </form>
    </div>
  );
}