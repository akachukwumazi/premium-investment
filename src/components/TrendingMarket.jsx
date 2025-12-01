"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function TrendingMarket() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarket = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );

      const data = await res.json();

      
      const filtered = data.filter((coin) =>
        ["btc", "eth", "bnb"].includes(coin.symbol.toLowerCase())
      );

     
      const ordered = ["bnb", "btc", "eth"].map((sym) =>
        filtered.find((c) => c.symbol.toLowerCase() === sym)
      );

      setCoins(ordered.filter(Boolean));
    } catch (error) {
      console.log("Market fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarket();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow w-full">
      <h2 className="text-xl font-bold mb-4">Trending Market</h2>

      <div className="grid grid-cols-5 text-gray-500 text-sm font-medium border-gray-200 border-b pb-2">
        <p>Token</p>
        <p>Symbol</p>
        <p>Last Price</p>
        <p>24H Change</p>
        <p>Market Cap</p>
      </div>

      {loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 py-4 border-b animate-pulse"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-10 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}

      {!loading &&
        coins.map((coin) => (
          <div
            key={coin.id}
            className="grid grid-cols-5 py-4 border-b border-gray-200 last:border-b-0 items-center"
          >
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
              {coin.name}
            </div>

            <p className="uppercase text-xl">{coin.symbol}</p>
            <p>${coin.current_price.toLocaleString()}</p>

            <p
              className={`font-semibold ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>

            <p>${coin.market_cap.toLocaleString()}</p>
          </div>
        ))}
    </div>
  );
}
