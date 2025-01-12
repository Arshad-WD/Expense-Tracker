import React from 'react';

function Cards({ WalletEntries }) {
    // Ensure WalletEntries is always an array
    const entries = Array.isArray(WalletEntries) ? WalletEntries : [];

    // Calculate total Wallet
    const totalWallet = entries.reduce((total, entry) => total + entry.amount, 0);

    return (
        <div className="w-[97%] sm:w-[75%] md:w-[60%] lg:w-[82%] xl:w-[75%] min-h-[32vh] sm:min-h-[40vh] md:min-h-[40vh] lg:min-h-[42vh] xl:min-h-[40vh] lg:ml-20 text-black font-signika my-6 rounded-3xl p-6 bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-300 shadow-lg flex flex-col justify-between">
            {/* Top Section */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-700 text-base sm:text-lg lg:text-xl px-4 sm:px-8">Overall Amount</h1>
                    <h1 className="text-black text-lg sm:text-xl lg:text-2xl font-semibold">Visa</h1>
                </div>
                <h2 className="text-black/80 mt-2 pl-4 sm:pl-8 text-3xl font-semibold sm:text-3xl lg:text-4xl">
                    ₹ {totalWallet.toFixed(2)}
                </h2>
            </div>

            {/* Bottom Section */}
            <div className="flex items-end">
                <h2 className="text-gray-900 pl-4 sm:pl-8 text-3xl sm:text-3xl lg:text-4xl">**** **** ****</h2>
                <h1 className="text-gray-900 pl-2 text-3xl sm:text-3xl lg:text-4xl">7860</h1>
            </div>
        </div>
    );
}

export default Cards;
