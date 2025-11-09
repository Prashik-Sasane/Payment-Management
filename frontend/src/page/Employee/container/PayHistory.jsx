import React, { useEffect, useState } from "react";
import api from "../../../api/axios.jsx";

const PayHistory = () => {
  const [payHistory, setPayHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayHistory = async () => {
      try {
        const res = await api.get("/api/employee/payroll");
        setPayHistory(res.data);
      } catch (err) {
        console.error("Error fetching pay history:", err);
        setPayHistory([]); // show no data message if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchPayHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading pay history...
      </div>
    );
  }

  if (payHistory.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No pay history available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payHistory.map((run, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row justify-between gap-4"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {run.pay_run_name} ({run.start_date} - {run.end_date})
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Status: <span className="font-medium">{run.pay_run_status}</span>
            </p>
          </div>

          <div className="flex gap-6 mt-2 md:mt-0 flex-wrap">
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-gray-900 font-semibold">
                ₹{run.amount?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bonus</p>
              <p className="text-gray-900 font-semibold">
                ₹{run.bonus?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deductions</p>
              <p className="text-gray-900 font-semibold">
                ₹{run.deductions?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Net Pay</p>
              <p className="text-green-600 font-semibold">
                ₹{run.net_pay?.toLocaleString() || 0}
              </p>
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className={`font-medium ${
              run.payment_status === "Paid" ? "text-green-600" : "text-yellow-600"
            }`}>
              {run.payment_status}
            </p>
            {run.transaction_date && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(run.transaction_date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayHistory;
