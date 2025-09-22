import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Stepper, { Step } from "./Stepper";
import "./Dashboard.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = "132, 0, 255";

const cardData = [
  { color: "#060010", title: "Analytics", description: "How to increase your cibil", label: "CIBIL" },
  { color: "#060010", title: "Dashboard", description: "Centralized data view", label: "Overview" },
  { color: "#060010", title: "Collaboration", description: "", label: "Money transfer" },
  { color: "#060010", title: "Automation", description: "", label: "Pending Requests" },
  { color: "#060010", title: "Integration", description: "Connect favorite tools", label: "Connectivity" },
  { color: "#060010", title: "Security", description: "Your security is our First-Priority", label: "Security" },
];

function BentoCardGrid({ children, gridRef }) {
  return <div ref={gridRef} className="card-grid">{children}</div>;
}

function ParticleCard({ children, className, style, particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={cardRef} className={`particle-container ${className}`} style={{ ...style, display: "flex", flexDirection: "column" }}>
      {Array.from({ length: particleCount }).map((_, idx) => (
        <span
          key={idx}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `rgba(${glowColor},0.5)`,
          }}
        />
      ))}
      {children}
    </div>
  );
}

const Dashboard = () => {
  const gridRef = useRef(null);

  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [balance] = useState(5000);

  const [transferName, setTransferName] = useState("");
  const [transferAcc, setTransferAcc] = useState("");
  const [transferIFSC, setTransferIFSC] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
  };

  return (
    <BentoCardGrid gridRef={gridRef}>
      {cardData.map((card, index) => {
        const cardProps = { className: "card card--border-glow p-4 rounded-lg shadow-lg", style: { backgroundColor: card.color } };

        return (
          <ParticleCard key={index} {...cardProps}>
            <div className="card__header">
              <div className="card__label">{card.label}</div>
            </div>
            <div className="card__content flex flex-col justify-center items-center min-h-[300px]">
              <h2 className="card__title">{card.title}</h2>
              <p className="card__description">{card.description}</p>

              {/* Money Transfer Stepper */}
              {card.title === "Collaboration" && (
                <div className="w-full max-w-md mt-4">
                  <Stepper initialStep={1} nextButtonText="Next" backButtonText="Back">
                    <Step>
                      <input
                        value={transferName}
                        onChange={(e) => setTransferName(e.target.value)}
                        placeholder="Account Holder Name"
                        className="w-full p-2 rounded mb-2"
                      />
                    </Step>
                    <Step>
                      <input
                        value={transferAcc}
                        onChange={(e) => setTransferAcc(e.target.value)}
                        placeholder="Account Number"
                        className="w-full p-2 rounded mb-2"
                      />
                    </Step>
                    <Step>
                      <input
                        value={transferIFSC}
                        onChange={(e) => setTransferIFSC(e.target.value)}
                        placeholder="IFSC Code"
                        className="w-full p-2 rounded mb-2"
                      />
                    </Step>
                    <Step>
                      <input
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        type="number"
                        placeholder="Amount"
                        className="w-full p-2 rounded mb-2"
                      />
                    </Step>
                    <Step>
                      <p className="text-center font-semibold text-green-400">
                        ₹{transferAmount} has been transferred successfully to {transferName}!
                      </p>
                    </Step>
                  </Stepper>
                </div>
              )}

              {/* Pending Requests Stepper */}
              {card.title === "Automation" && (
                <div className="w-full max-w-md mt-4">
                  <Stepper initialStep={1} nextButtonText="Next" backButtonText="Back">
                    <Step>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="Account Number"
                        className="w-full p-2 rounded mb-2"
                      />
                    </Step>
                    <Step>
                      <div className="flex justify-center gap-2 mb-2">
                        {pin.map((p, i) => (
                          <input
                            key={i}
                            type="password"
                            value={p}
                            maxLength={1}
                            onChange={(e) => handlePinChange(i, e.target.value)}
                            className="w-12 h-12 text-center rounded border"
                          />
                        ))}
                      </div>
                    </Step>
                    <Step>
                      <div className="flex justify-center gap-2 mb-2">
                        {pin.map((p, i) => (
                          <input
                            key={i}
                            type="password"
                            value={p}
                            readOnly
                            className="w-12 h-12 text-center rounded border bg-gray-200"
                          />
                        ))}
                      </div>
                    </Step>
                    <Step>
                      <p className="text-center font-semibold text-green-400">
                        Account: {accountNumber} <br />
                        Balance: ${balance}
                      </p>
                    </Step>
                  </Stepper>
                </div>
              )}
            </div>
          </ParticleCard>
        );
      })}
    </BentoCardGrid>
  );
};

export default Dashboard;
