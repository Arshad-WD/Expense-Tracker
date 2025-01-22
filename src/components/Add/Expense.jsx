import React, { useState } from 'react';
import { FaFilm, FaShoppingCart, FaMoneyCheckAlt, FaCreditCard, FaRegHandshake, FaLaptop } from 'react-icons/fa';
import Modal from 'react-modal';

function Expense({ expenseEntries, onExpense }) {
  const [expenseInput, setExpenseInput] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle adding an expense
  const addExpense = () => {
    if (!expenseInput || isNaN(expenseInput)) {
      setErrorMessage('Please enter a valid number.');
      setShowModal(true);
      return;
    }

    const amount = parseFloat(expenseInput);

    if (amount < 0) {
      setErrorMessage('Amount cannot be negative.');
      setShowModal(true);
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount,
      category: expenseCategory || 'Other',
      description: descriptionInput.trim() || 'No details provided',
      date: new Date(),
    };

    // Call the parent function to add the new expense
    onExpense(newExpense);

    // Reset input fields
    setExpenseInput('');
    setExpenseCategory('');
    setDescriptionInput('');
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Subscription':
        return <FaLaptop size={20} />;
      case 'Loan':
        return <FaMoneyCheckAlt size={20} />;
      case 'Movie':
        return <FaFilm size={20} />;
      case 'Food':
        return <FaShoppingCart size={20} />;
      case 'Online-Product':
        return <FaShoppingCart size={20} />;
      case 'Contribution':
        return <FaRegHandshake size={20} />;
      case 'Bills':
        return <FaCreditCard size={20} />;
      default:
        return <FaRegHandshake size={20} />;
    }
  };

  // Filter Today's Expenses
  const getTodayExpenses = () => {
    const today = new Date();
    return expenseEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === today.toDateString();
    });
  };

  // Filter This Week's Expenses (from Monday to Sunday)
  const getThisWeekExpenses = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    return expenseEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });
  };

  const getTotalAmount = (entries) => {
    return entries.reduce((total, entry) => total + entry.amount, 0).toFixed(2);
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Expense Input Section */}
      <div className="p-6 mx-auto shadow-md rounded-lg mt-4 max-w-4xl">
        <h2 className="text-lg font-semibold text-white">Add Expense</h2>
        <div className="flex flex-col md:flex-row lg:flex-row sm:items-center mt-4 space-y-4 md:space-y-0 lg:space-y-0">
          <input
            type="number"
            placeholder="Enter amount"
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-4/5 mr-4 focus:outline-indigo-500"
          />
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-4/5 mr-4 mt-4 sm:mt-0"
          >
            <option value="">Select Category</option>
            <option value="Subscription">Subscription</option>
            <option value="Loan">Loan</option>
            <option value="Movie">Movie</option>
            <option value="Food">Food</option>
            <option value="Online-Product">Online Product</option>
            <option value="Contribution">Contribution to Friend</option>
            <option value="Bills">Bills</option>
          </select>
          <input
            type="text"
            placeholder="Description (optional)"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full sm:w-4/5 mr-4 mt-4 sm:mt-0"
          />
          <button
            onClick={addExpense}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all mt-4 sm:mt-0 sm:w-1/5"
          >
            Expense
          </button>
        </div>
      </div>

      {/* Today's Expenses */}
      <div className="p-6 mx-auto shadow-md rounded-lg mt-6 max-w-4xl">
        <h3 className="text-lg font-semibold text-white mb-4">Today's Expenses</h3>
        <ul className="space-y-4">
          {getTodayExpenses().map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 rounded-[27px] bg-gray-900 hover:bg-gray-600 transition-all"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <div className="flex items-center justify-center bg-red-600 text-white rounded-full w-10 h-10 mr-4">
                    {getCategoryIcon(entry.category)}
                  </div>
                  <div className="flex flex-col sm:flex-col w-full sm:w-auto sm:items-start">
                    <span className="text-xl font-semibold text-white">{entry.category}</span>
                    <div className="text-sm text-gray-300">{entry.description}</div>
                  </div>
                </div>
                <div className="text-lg text-red-500 ml-4 sm:ml-0 flex items-center">
                  <span>$</span>
                  <span className="ml-1">{entry.amount.toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-white">
          Total: ${getTotalAmount(getTodayExpenses())}
        </div>
      </div>

      {/* This Week's Expenses */}
      <div className="p-6 mx-auto shadow-md rounded-lg mt-6 max-w-4xl">
        <h3 className="text-lg font-semibold text-white mb-4">This Week's Expenses</h3>
        <ul className="space-y-4">
          {getThisWeekExpenses().map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 rounded-[27px] bg-gray-900 hover:bg-gray-600 transition-all"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <div className="flex items-center justify-center bg-red-600 text-white rounded-full w-10 h-10 mr-4">
                    {getCategoryIcon(entry.category)}
                  </div>
                  <div className="flex flex-col sm:flex-col w-full sm:w-auto sm:items-start">
                    <span className="text-xl font-semibold text-white">{entry.category}</span>
                    <div className="text-sm text-gray-300">{entry.description}</div>
                  </div>
                </div>
                <div className="text-lg text-red-500 ml-4 sm:ml-0 flex items-center">
                  <span>$</span>
                  <span className="ml-1">{entry.amount.toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-white">
          Total: ${getTotalAmount(getThisWeekExpenses())}
        </div>
      </div>

      {/* Modal for confirmation or error */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        appElement={document.getElementById('root')}
      >
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          {errorMessage || 'Money deducted successfully.'}
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

export default Expense;
