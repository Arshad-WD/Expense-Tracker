import React, { useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import Modal from "react-modal";

function Wallet({ walletEntries = [], setWalletEntries }) {
  const [walletInput, setWalletInput] = useState("");
  const [sourceInput, setSourceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getToday = () => new Date();
  const getStartOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const getTodayEntries = () => {
    const today = getToday();
    return walletEntries.filter((entry) => {
      const entryDate = new Date(entry.id);
      return (
        entryDate.getDate() === today.getDate() &&
        entryDate.getMonth() === today.getMonth() &&
        entryDate.getFullYear() === today.getFullYear()
      );
    });
  };

  const getThisWeekEntries = () => {
    const startOfWeek = getStartOfWeek();
    return walletEntries.filter((entry) => new Date(entry.id) >= startOfWeek);
  };

  const calculateTotal = (entries) => {
    return entries.reduce((total, entry) => total + entry.amount, 0).toFixed(2);
  };

  const addWallet = () => {
    if (!walletInput || isNaN(walletInput)) {
      console.log("Invalid input: Must be a number.");
      setErrorMessage("Please enter a valid number and specify the source.");
      setShowModal(true);
      return;
    }

    const amount = parseFloat(walletInput);

    if (amount < 0) {
      setErrorMessage("Amount cannot be negative.");
      setShowModal(true);
      return;
    }

    const newEntry = {
      id: Date.now(),
      amount: amount,
      source: sourceInput,
      description: descriptionInput || "No details provided.",
    };
    setWalletEntries((prevEntries) => [...prevEntries, newEntry]);
    setWalletInput("");
    setSourceInput("");
    setDescriptionInput("");
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Wallet Input Section */}
      <div className="p-6 mx-auto shadow-md rounded-lg mt-4 max-w-4xl">
        <h2 className="text-lg font-semibold text-white">Add Wallet</h2>
        <div className="flex flex-col sm:flex-row sm:items-center mt-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={walletInput}
            onChange={(e) => setWalletInput(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-4/5 mr-4 focus:outline-indigo-500"
          />
          <input
            type="text"
            placeholder="Source (e.g., Friend, Job, Parents)"
            value={sourceInput}
            onChange={(e) => setSourceInput(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-4/5 mr-4 mt-4 sm:mt-0"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-4/5 mr-4 mt-4 sm:mt-0"
          />
          <button
            onClick={addWallet}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all mt-4 sm:mt-0 sm:w-1/5"
          >
            Add
          </button>
        </div>
      </div>

      {/* Today's Entries Section */}
      <div className="flex flex-col sm:flex-row justify-between mx-auto mt-6 max-w-4xl space-y-4 sm:space-y-0">
        {/* Today's Entries */}
        <div className="p-4 rounded-lg shadow-md text-white w-full sm:w-full sm:mr-4">
          <h3 className="font-semibold text-xl mb-4">Today's Entries</h3>
          <ul className="space-y-4">
            {getTodayEntries().map((entry) => (
              <li
                key={entry.id}
                className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 rounded-[27px] bg-gray-900 hover:bg-gray-600 transition-all"
              >
                <div className="flex items-center justify-between w-full">
                  {/* Icon and Source label */}
                  <div className="flex items-center w-full">
                    <div className="flex items-center justify-center bg-green-600 text-white rounded-full w-10 h-10 mr-4">
                      <FaCashRegister size={20} />
                    </div>
                    <div className="flex flex-col sm:flex-col w-full sm:w-auto sm:items-start">
                      {/* Source label */}
                      <span className="text-xl font-semibold text-white">
                        {entry.source || "Cash In"}
                      </span>
                      {/* Description below the source, only visible on larger screens */}
                      <div className=" text-sm text-gray-300">
                        {entry.description || "No details provided."}
                      </div>
                    </div>
                  </div>

                  {/* Amount section */}
                  <div className="text-lg text-green-500 ml-4 sm:ml-0 flex items-center">
                    <span>₹</span>
                    <span className="ml-1">{entry.amount.toFixed(2)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* This Week's Entries Section */}
      <div className="flex flex-col sm:flex-row justify-between mx-auto mt-6 max-w-4xl space-y-4 sm:space-y-0">
        {/* This Week's Entries */}
        <div className="p-4 rounded-lg shadow-md text-white w-full sm:w-full sm:mr-4">
          <h3 className="font-semibold text-xl mb-4">This Week's Entries</h3>
          <ul className="space-y-4">
            {getThisWeekEntries().map((entry) => (
              <li
                key={entry.id}
                className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 rounded-[27px] bg-gray-900 hover:bg-gray-600 transition-all"
              >
                <div className="flex items-center justify-between w-full">
                  {/* Icon and Source label */}
                  <div className="flex items-center w-full">
                    <div className="flex items-center justify-center bg-green-600 text-white rounded-full w-10 h-10 mr-4">
                      <FaCashRegister size={20} />
                    </div>
                    <div className="flex flex-col sm:flex-col w-full sm:w-auto sm:items-start">
                      {/* Source label */}
                      <span className="text-xl font-semibold text-white">
                        {entry.source || "Cash In"}
                      </span>
                      {/* Description below the source, only visible on larger screens */}
                      <div className=" text-sm text-gray-300">
                        {entry.description || "No details provided."}
                      </div>
                    </div>
                  </div>

                  {/* Amount section */}
                  <div className="text-lg text-green-500 ml-4 sm:ml-0 flex items-center">
                    <span>₹</span>
                    <span className="ml-1">{entry.amount.toFixed(2)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for confirmation or error */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        appElement={document.getElementById("root")}
      >
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          {errorMessage
            ? errorMessage
            : "Are you sure you want to delete this wallet?"}
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-6 py-3 rounded-3xl hover:bg-gray-300 hover:text-black hover:font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Wallet;
