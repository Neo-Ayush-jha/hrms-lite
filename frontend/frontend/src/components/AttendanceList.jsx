import api from "../api/axios";
import { useEffect, useState } from "react";

export default function AttendanceList({ reload }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("attendance/").then((res) => setRecords(res.data));
  }, [reload]);

  if (!records.length)
    return <p className="text-gray-400 mt-4">No attendance records</p>;

  return (
    <div className="bg-white rounded-xl shadow mt-6 p-4 text-sm">
      {records.map((r) => (
        <p key={r.id} className="border-b py-1">
          Employee #{r.employee} — {r.date} — {r.status}
        </p>
      ))}
    </div>
  );
}