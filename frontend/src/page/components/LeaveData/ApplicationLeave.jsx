import React from "react";

const ApplicationLeave = () => {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 mb-5 border border-gray-200">
        <div className="font-bold text-md mb-3">Payment Status</div>
        <div className="text-lg font-bold mb-1">
          2,400
          <span className="text-xs font-normal">Employees</span>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="flex-1 h-2 bg-sky-400 rounded-full"></div>
          <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
          <div className="flex-1 h-2 bg-purple-400 rounded-full"></div>
        </div>
        <div className="flex justify-between text-xs font-medium mb-2">
          <span className="text-sky-400">68% Paid</span>
          <span className="text-yellow-500">17% Pending</span>
          <span className="text-purple-600">15% Unpaid</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border-t-4 border-indigo-500">
        <div className="font-bold text-md mb-3">
          Employee Time-off{" "}
          <span className="float-right text-xs text-indigo-500 cursor-pointer">
            View all
          </span>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between border-b pb-2 border-gray-300">
            <span className="flex items-center gap-2">
              <img
                alt="Aarav"
                className="w-6 h-6 rounded-full"
                src="https://randomuser.me/api/portraits/men/12.jpg"
              />{" "}
              Aarav Patel{" "}
              <span className="text-xs text-gray-400">Sick Leave</span>
            </span>
            <span className="text-red-400 font-medium">12 - 14 Oct 2025</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2 border-gray-300">
            <span className="flex items-center gap-2">
              <img
                alt="Priya"
                className="w-6 h-6 rounded-full"
                src="https://randomuser.me/api/portraits/women/45.jpg"
              />{" "}
              Priya Mehta{" "}
              <span className="text-xs text-gray-400">Vacation</span>
            </span>
            <span className="text-red-400 font-medium">20 - 25 Oct 2025</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <img
                alt="Rohan"
                className="w-6 h-6 rounded-full"
                src="https://randomuser.me/api/portraits/men/50.jpg"
              />{" "}
              Rohan Kumar{" "}
              <span className="text-xs text-gray-400">Family Event</span>
            </span>
            <span className="text-red-400 font-medium">28 - 31 Oct 2025</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationLeave;
