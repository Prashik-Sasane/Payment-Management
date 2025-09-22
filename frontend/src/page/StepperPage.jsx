// src/page/StepperPage.jsx
import React from "react";
import Stepper, { Step } from "../components/Stepper";

export default function StepperPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Stepper
        initialStep={1}
        onStepChange={(step) => console.log("Step changed:", step)}
        onFinalStepCompleted={() => console.log("All steps complete!")}
      >
        <Step>
          <div className="p-4">
            <h2 className="text-lg font-bold">Step 1: Personal Info</h2>
            <p className="text-sm text-gray-600">
              Enter your name and contact details.
            </p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-lg font-bold">Step 2: Bank Info</h2>
            <p className="text-sm text-gray-600">
              Fill in account number and IFSC code.
            </p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-lg font-bold">Step 3: Review</h2>
            <p className="text-sm text-gray-600">
              Review the details before confirming.
            </p>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
