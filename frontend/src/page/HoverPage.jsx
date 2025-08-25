import React from "react";
import HoverCard from "../components/HoverCard";
import { FaCreditCard, FaExchangeAlt, FaUniversity, FaWallet, FaHistory } from "react-icons/fa";

const HoverPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-white text-4xl font-bold mb-10">Bank Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { type: "payment", title: "Payment", description: "Send and receive secure payments instantly.", icon: FaCreditCard  },
          { type: "transfer", title: "Bank Transfer", description: "Easily transfer funds to any bank account.", icon: FaExchangeAlt },
          { type: "addBank", title: "Add Bank", description: "Link your new bank account safely.", icon: FaUniversity },
          { type: "balance", title: "Check Balance", description: "Track your account balance in real-time.", icon: FaWallet },
          { type: "history", title: "Transaction History", description: "View and analyze your money flow.", icon: FaHistory },
        ].map(({ type, title, description, icon }) => (
          <HoverCard
            key={type}
            title={title}
            description={description}
            icon={icon}
            className={`
              bg-[rgba(18,20,29,0.85)] 
              text-[#fafcff] rounded-3xl
              shadow-[0_4px_20px_rgba(0,0,0,0.24)]  
              flex flex-col items-start p-8 
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
              cursor-pointer
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default HoverPage;
