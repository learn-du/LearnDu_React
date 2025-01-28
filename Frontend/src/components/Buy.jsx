import React from "react";

const books = [
  { title: "Principle of Macroeconomics", college: "Hansraj", price: "₹ 90" },
  { title: "Introduction to Microeconomics", college: "St. Stephen's", price: "₹ 120" },
  { title: "Advanced Physics", college: "Miranda House", price: "₹ 150" },
];

function Buy() {
  return (
    <div className="bg-white py-10">
    <h1 className="text-xl font-bold text-yellow-500 text-center mb-8">
      Available Books
    </h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
      {books.map((book, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-md p-2 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col items-center h-[350px]"
        >
          {/* Image Container */}
          <div className="w-full h-[200px] border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">
            <span className="text-gray-500">Book Image</span>
          </div>
          
          {/* Content */}
          <div className="mt-2 flex-grow text-center">
            <h2 className="text-sm font-semibold text-black">
              {book.title}
            </h2>
            <p className="text-xs text-black mt-1 font-bold">
              Seller’s College: <span className=" font-semibold">{book.college}</span>
            </p>
          </div>
          <button className="mt-2 px-4 py-2 text-yellow cursor-pointer rounded hover:bg-blue-600 w-full">
                See Book Images
              </button>
          {/* Footer */}
          <div className="mt-2 flex items-center justify-between w-full">
            <p className="text-sm font-bold text-black">{book.price}</p>
            <button className="px-2 py-1 bg-yellow text-black rounded-md hover:bg-white hover:text-yellow text-xs">
              Contact Seller
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  );
}

export default Buy;
