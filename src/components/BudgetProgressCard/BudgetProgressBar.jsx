import React, { useEffect } from 'react';

const BudgetProgressCard = ({ remainingAmount }) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const totalDays = (endOfMonth - startOfMonth) / (1000 * 60 * 60 * 24);
    const elapsedDays = (today - startOfMonth) / (1000 * 60 * 60 * 24);
    const progress = (elapsedDays / totalDays) * 100;

    const month = today.toLocaleString('default', { month: 'short' });
    const startLabel = `${month} 1`;
    const endLabel = `${month} ${endOfMonth.getDate()}`;

    useEffect(() => {
        console.log(`Remaining Amount Updated: ₹${remainingAmount}`);
    }, [remainingAmount]);

    return (
        <div className="flex flex-col sm:flex-row md:flex-row my-0 sm:my-6 mx-0 sm:mx-auto w-[98%] sm:w-[94%] md:w-[95%] lg:w-[85%] xl:w-[80%] min-h-[32vh] sm:min-h-[40vh] lg:min-h-[40vh] text-white rounded-3xl shadow-lg">
            <div className="flex flex-col justify-between p-4 sm:w-[60%] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-tl-3xl rounded-tr-3xl sm:rounded-tr-none sm:rounded-bl-3xl ml-[0.5%]">
                <div>
                    <h3 className="text-md sm:text-base font-semibold text-gray-300 mb-2">
                        Due Date Progress
                    </h3>
                </div>
                <div>
                    <div className="text-xs sm:text-sm flex justify-between mb-1">
                        <span>{startLabel}</span>
                        <span>{endLabel}</span>
                    </div>
                    <div className="h-3 sm:h-4 bg-gray-600 rounded-full overflow-hidden mb-6">
                        <div
                            style={{ width: `${progress}%` }}
                            className="h-full bg-indigo-500"
                        ></div>
                    </div>
                    <div className="text-xs text-gray-400">
                        {Math.round(progress)}% of the month has passed
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between p-4 sm:w-[40%] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 rounded-bl-3xl rounded-br-3xl sm:rounded-bl-none sm:rounded-tr-3xl ml-[0.5%]">
                <div className="flex-grow"></div>
                <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-2">
                        Remaining Amount
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-indigo-400">
                        ₹ {remainingAmount}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BudgetProgressCard;
