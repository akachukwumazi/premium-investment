import React from "react";

const StockCard = ({
  name = "Apple Inc.",
  symbol = "AAPL",
  type = "Stock",
  unitsHeld = 0,
  changePercent = 0.26,
  currentPrice = 175.2,
  imageSrc,
  onBuyClick,
  investors,
  buttonText = "Buy Stocks",
}) => {
  const changeColor = changePercent >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full shadow-sm bg-white flex flex-col gap-2">
      <h2 className="text-purple-500 font-semibold text-lg">
        {name} ({symbol})
      </h2>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={`${name} chart`}
          className="w-full h-24 object-cover my-2 rounded-md"
        />
      )}

      <div className="text-gray-700 text-sm space-y-1">
        <p>
          <span className="font-semibold">Type:</span> {type}
        </p>
        <p>
          <span className="font-semibold">Units Held:</span> {unitsHeld}
        </p>
        <p className={changeColor}>
          <span className="font-semibold">Change %:</span>{" "}
          {changePercent > 0 ? "+" : ""}
          {changePercent}%
        </p>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex -space-x-3">
          {investors.slice(0, 3).map((i, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[10px] font-semibold text-gray-600"
            >
              {i}
            </div>
          ))}
          {investors.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[10px] font-semibold text-gray-600">
              +{investors.length - 3}
            </div>
          )}
        </div>
        <p className="text-gray-500 font-bold mt-2">
          Current price: ${currentPrice.toFixed(2)}
        </p>
      </div>

      <button
        onClick={onBuyClick}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:opacity-95 active:scale-95 duration-150  transition-all"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default StockCard;
