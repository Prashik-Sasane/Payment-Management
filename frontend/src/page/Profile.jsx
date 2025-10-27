import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/profile")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Bank:</strong> {user.bank_name}</p>
      <p><strong>Balance:</strong> ₹{user.balance}</p>
    </div>
  );
};

export default Profile;
