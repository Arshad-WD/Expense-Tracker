import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";

function Transaction() {
  const [walletEntries, setWalletEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  // Retrieve data from localStorage
  useEffect(() => {
    const storedWalletEntries = localStorage.getItem("walletEntries");
    const storedExpenseEntries = localStorage.getItem("expenseEntries");

    if (storedWalletEntries) {
      setWalletEntries(JSON.parse(storedWalletEntries));
    }

    if (storedExpenseEntries) {
      setExpenseEntries(JSON.parse(storedExpenseEntries));
    }
  }, []);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[80%] mx-auto bg-black rounded-3xl shadow-2xl p-10 my-10">
      {/* Top Section */}
      <div className="text-center mb-12">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl">Your Transactions</h1>
      </div>

      {/* Wallet and Expense Entries */}
      <div className="space-y-10">
        {/* Wallet Entries */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-6">Wallet Entries</h2>
          <div className="space-y-2">
            {walletEntries.length === 0 ? (
              <p className="text-gray-400">No wallet entries yet.</p>
            ) : (
              walletEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-800 text-green-500 rounded-3xl p-5 shadow-md hover:scale-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <FaWallet className="text-green-500 text-3xl mr-4" />
                    <span className="text-lg font-medium">{entry.label || "Cash In"}</span>
                  </div>
                  <span className="text-2xl font-semibold">+ {`₹ ${entry.amount}`}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Expense Entries */}
        <div>
          <h2 className="text-white font-semibold text-2xl mb-6">Expense Entries</h2>
          <div className="space-y-2">
            {expenseEntries.length === 0 ? (
              <p className="text-gray-400">No expense entries yet.</p>
            ) : (
              expenseEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-800 text-red-500 rounded-3xl p-4 shadow-md hover:scale-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <IoCashOutline className="text-red-500 text-3xl mr-4" />
                    <span className="text-lg font-medium">{entry.label || "Cash Out"}</span>
                  </div>
                  <span className="text-2xl font-semibold">- {`₹ ${entry.amount}`}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
