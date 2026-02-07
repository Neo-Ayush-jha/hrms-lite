import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { useEffect, useState } from "react";

export default function EmployeeList({ reload }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("employees/").then((res) => setEmployees(res.data));
  }, [reload]);

  const remove = async (id) => {
    if (!confirm("Delete employee?")) return;
    await api.delete(`employees/${id}/`);
    toast.success("Employee deleted");
    setEmployees(employees.filter((e) => e.id !== id));
  };

  if (!employees.length)
    return <p className="text-gray-400 mt-4">No employees found</p>;

  return (
    <div className="bg-white rounded-xl shadow mt-6 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{e.full_name}</td>
              <td>{e.email}</td>
              <td>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                  {e.department}
                </span>
              </td>
              <td className="text-center">
                <button
                  onClick={() => remove(e.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 justify-center"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}