import { UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { useState } from "react";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("employees/", form);
      toast.success("Employee added");
      setForm({ full_name: "", email: "", department: "" });
      refresh();
    } catch (err) {
      toast.error("Failed to add employee");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="text-blue-600" /> Add Employee
      </h3>

      <form onSubmit={submit}>
        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <UserPlus size={16} /> Add
        </button>
      </form>
    </div>
  );
}