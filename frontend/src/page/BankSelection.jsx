import { useState } from "react";

// Bank logos for known banks
const bankLogos = {
  "HDFC Bank": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/HDFC_logo.svg/1280px-HDFC_logo.svg.png",
  "ICICI Bank": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfUAAABl...", // shortened for brevity
  "Axis Bank": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbkAAABy...", 
  SBI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATcAAACiCAMAAAATIHpE...",
  Kotak: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZsAAAB7CAMAAACVdd38...",
  "Bank of Baroda": "https://upload.wikimedia.org/wikipedia/en/f/f3/Bank_of_Baroda_Logo.svg",
  "Punjab National Bank": "https://upload.wikimedia.org/wikipedia/en/7/7b/Punjab_National_Bank_Logo.svg",
  "Canara Bank": "https://upload.wikimedia.org/wikipedia/en/b/b0/Canara_Bank_Logo.svg",
  "Union Bank": "https://upload.wikimedia.org/wikipedia/en/c/c9/Union_Bank_Logo.svg",
  "IDBI Bank": "https://upload.wikimedia.org/wikipedia/en/9/9a/IDBI_Bank_New_Logo.svg",
  "Yes Bank": "https://upload.wikimedia.org/wikipedia/en/5/5e/Yes_Bank_Logo.svg",
};

const initialBanks = ["HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "Kotak"];

const extendedBanks = [
  "Bank of Baroda",
  "Punjab National Bank",
  "Canara Bank",
  "Union Bank",
  "IDBI Bank",
  "Yes Bank",
  "Central Bank of India",
  "IDFC First Bank",
  "IndusInd Bank",
  "Punjab & Sind Bank",
];

export default function BankSelection() {
  const [banks, setBanks] = useState(initialBanks);
  const [showModal, setShowModal] = useState(false);

  const addBank = (bank) => {
    if (!banks.includes(bank)) {
      setBanks([...banks, bank]);
    }
    setShowModal(false); // Close modal after adding a bank
  };

  const handleNoBank = () => {
    setShowModal(false); // Close modal when user opts for no bank
  };

  return (
    <div className="min-h-screen bg-[#f3f0fa] p-10 w-full mx-auto">
      <h2 className="text-3xl font-semibold mb-10 text-[#2d1155] text-center">
        Select Your Bank
      </h2>
      <div className="grid grid-cols-3 gap-8 mb-8">
        {banks.map((bank, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer p-8 flex flex-col items-center font-semibold text-[#5443cf] transition-transform transform hover:-translate-y-1"
          >
            {bankLogos[bank] ? (
              <img
                src={bankLogos[bank]}
                alt={bank}
                className="w-24 h-auto object-contain mb-4"
              />
            ) : (
              <div className="w-24 h-16 mb-4 bg-gray-300 flex items-center justify-center rounded-md text-gray-600">
                No Logo
              </div>
            )}
            {bank}
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="block mx-auto w-60 py-4 rounded-full bg-[#5443cf] text-white font-semibold text-lg hover:bg-[#6d63fc] transition"
      >
        + Add New Bank
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full overflow-y-auto max-h-[80vh] relative">
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#5443cf]">
              Add Bank from List
            </h3>
            <button
              onClick={handleNoBank}
              className="absolute top-4 right-6 text-3xl font-bold text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
              title="Close"
            >
              &times;
            </button>
            <div className="grid grid-cols-4 gap-6">
              {extendedBanks.map((bank, idx) => (
                <div
                  key={idx}
                  onClick={() => addBank(bank)}
                  className="cursor-pointer bg-[#f3f0fa] rounded-lg flex flex-col items-center p-4 hover:bg-[#e6e1fa] transition"
                >
                  {bankLogos[bank] ? (
                    <img
                      src={bankLogos[bank]}
                      alt={bank}
                      className="w-20 h-auto object-contain mb-3"
                    />
                  ) : (
                    <div className="w-20 h-12 bg-gray-300 rounded-md mb-3 flex items-center justify-center text-gray-600">
                      No Logo
                    </div>
                  )}
                  <span className="text-[#5443cf] font-medium text-center">{bank}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleNoBank}
                className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                &#x2716; No Bank/Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
