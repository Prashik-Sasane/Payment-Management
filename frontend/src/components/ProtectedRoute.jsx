// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ role, children }) {
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const endpoint =
//           role === "employee"
//             ? "http://localhost:5000/api/auth/employee/dashboard"
//             : "http://localhost:5000/api/auth/hr/dashboard";

//         await axios.get(endpoint, { withCredentials: true });
//         setAuthorized(true);
//       } catch {
//         setAuthorized(false);
//       }
//     };
//     verifyUser();
//   }, [role]);

//   if (authorized === null) return <p>Checking authentication...</p>;
//   return authorized ? children : <Navigate to={`/${role}/login`} />;
// }
