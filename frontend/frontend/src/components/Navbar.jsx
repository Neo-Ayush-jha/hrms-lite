import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-semibold text-lg">
        <Shield className="text-blue-600" />
        HRMS Lite
      </div>
      <span className="text-sm text-gray-500">Admin Panel</span>
    </div>
  );
}