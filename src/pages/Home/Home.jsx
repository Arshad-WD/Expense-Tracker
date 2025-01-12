import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cards from "../../components/Cards/Cards.jsx";
import Wallet from "../../components/Add/Wallet.jsx";
import Expense from "../../components/Add/expense.jsx";
import BudgetProgressCard from "../../components/BudgetProgressCard/BudgetProgressBar.jsx";
import { FaWallet } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";
import Footer from "../../components/Footer/footer.jsx";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [selected, setSelected] = useState("wallet");

  const [walletEntries, setWalletEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  // Calculate totals for budget progress
  const totalBudget = walletEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );
  const totalExpenses = expenseEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );
  const remainingAmount = totalBudget - totalExpenses;

  // Load data from localStorage if available
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

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (walletEntries.length > 0) {
      localStorage.setItem("walletEntries", JSON.stringify(walletEntries));
    }
    if (expenseEntries.length > 0) {
      localStorage.setItem("expenseEntries", JSON.stringify(expenseEntries));
    }
  }, [walletEntries, expenseEntries]);

  const navigate = useNavigate();

  const handleViewTransactions = () => {
    // Before navigating, store data to localStorage
    localStorage.setItem("walletEntries", JSON.stringify(walletEntries));
    localStorage.setItem("expenseEntries", JSON.stringify(expenseEntries));
    
    // Navigate to Transaction page
    navigate("/transactions");
  };

  return (
    <div className="flex h-screen bg-black">
      <div className="flex-1 pl-4 pt-4 snap-y">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <Cards WalletEntries={walletEntries} />
          <BudgetProgressCard remainingAmount={remainingAmount} />
        </div>

        <div className="flex justify-center mt-6">
          <div className="relative flex bg-gray-700 rounded-full shadow-lg w-[90%] sm:w-[60%] p-1">
            <div
              className={`absolute top-1 bottom-1 left-1 w-1/2 rounded-full transition-transform duration-300 ${
                selected === "wallet"
                  ? "bg-indigo-500"
                  : "translate-x-full bg-red-500"
              }`}
            ></div>

            <button
              className={`relative flex-1 py-2 rounded-full font-semibold text-lg ${
                selected === "wallet" ? "text-white" : "text-gray-300"
              } transition-all duration-300`}
              onClick={() => setSelected("wallet")}
            >
              <div className="flex items-center justify-center">
                <FaWallet className="mx-1" />
                Income
              </div>
            </button>

            <button
              className={`relative flex-1 py-2 rounded-full font-semibold text-lg ${
                selected === "expense" ? "text-white" : "text-gray-300"
              } transition-all duration-300`}
              onClick={() => setSelected("expense")}
            >
              <div className="flex items-center justify-center">
                <IoCashOutline className="mx-1" />
                Expense
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6">
          {selected === "wallet" && (
            <Wallet
              walletEntries={walletEntries}
              setWalletEntries={setWalletEntries}
            />
          )}
          {selected === "expense" && (
            <Expense
              expenseEntries={expenseEntries}
              onExpense={(newExpense) =>
                setExpenseEntries((prevEntries) => [...prevEntries, newExpense])
              }
            />
          )}
        </div>

        {/* Use handleViewTransactions to navigate to /transactions */}
        <button onClick={handleViewTransactions} className="text-blue-500 mt-6">
          View All Transactions
        </button>

        <Footer />
      </div>
    </div>
  );
};

Home.propTypes = {
  walletEntries: PropTypes.array,
  expenseEntries: PropTypes.array,
  totalBudget: PropTypes.number,
  totalExpenses: PropTypes.number,
  remainingAmount: PropTypes.number,
};

export default Home;
