import React, { useState } from "react";

const HoverCard = ({ title, description, icon: Icon, className }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(168,85,247,0.35), transparent 70%)`,
          }}
        />
      )}

    
      <div
        className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 ${
          isHovered ? "border-purple-500 shadow-[0_0_20px_4px_rgba(168,85,247,0.6)]" : "border-transparent"
        }`}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        {Icon && <Icon className="w-10 h-10 text-purple-400 mb-4" />}
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default HoverCard;
