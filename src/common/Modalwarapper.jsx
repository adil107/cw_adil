import React, { useState } from "react";

const Modalwarapper = ({ isOpen, close, width, children }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          {/* ...Existing modal content... */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div
              className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all modal-width-custom ${width}`}
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                <div className="flex justify-end">
                  <button
                    onClick={close}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modalwarapper;
