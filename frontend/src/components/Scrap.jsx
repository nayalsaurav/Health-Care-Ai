import React, { useState } from "react";
import axios from "axios";
import AyurvedicMedicinesCarousel from "./Carousal";
import Carousel from "./Carousal";

const Scrap = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onClickHandler = async () => {
    if (search.trim() !== "") {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/search",
          {
            searchTerm: search,
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <div className="max-h-screen overflow-y-auto bg-[#09090B] text-gray-100 p-6">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">
            Product Search
          </h1>
          <p className="text-gray-400">
            Find the best products with our advanced search engine
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-grow">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Search Products
              </label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter product name or keywords..."
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            <button
              onClick={onClickHandler}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <span>Searching...</span> : <span>Search</span>}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="animate-pulse text-indigo-400 text-center">
              <p className="text-lg font-medium">Searching for products...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Display Data */}
        {!isLoading && data && data.length > 0 ? (
          <div className="flex justify-center items-center md:w-1/2 mx-auto">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-200 hover:translate-y-1 hover:shadow-xl"
              >
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <img
                    src={"https://placehold.co/600x400/png"}
                    className="h-full w-full object-cover"
                    alt={item.product_name || "Product"}
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                    {item.search_term}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-3 text-white">
                    {item.product_name}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-indigo-300">
                      ${item.price}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-300">{item.rating}</span>
                    </div>
                  </div>

                  <a
                    href={item.product_url}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && data ? (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-gray-400 text-lg">
              No results found. Try a different search term.
            </p>
          </div>
        ) : null}
      </div>
      <Carousel />
    </div>
  );
};

export default Scrap;
