import React, { useState, useEffect } from "react";
import axios from "axios";

function Buy() {
  const [books, setBooks] = useState([]); // State to store books fetched from the backend
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(""); // State for error handling

  // Fetch books from the backend when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://learndu-services-backend.onrender.com/api/books"); // Replace with your API endpoint
        setBooks(response.data); // Set fetched books in state
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on selected filters
  const filteredBooks = books.filter(
    (book) =>
      (!selectedCollege || book.collegeName === selectedCollege) &&
      (!selectedSubject || book.category === selectedSubject) &&
      (!selectedSubcategory || book.subcategory === selectedSubcategory)
  );

  const handleContactSeller = (bookTitle, whatsappNumber) => {
    const message = `Hi Dear [Username],
I came across your listing for ${bookTitle} on Learn DU and would like to express my interest in purchasing it. Please let me know the necessary details for the transaction.

If the listing is not available kindly update it 
Update link : [link to my listings page].

Looking forward to your response.`;

    // Redirect to WhatsApp with seller's number and message
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white py-10">
      <h1 className="text-xl font-bold text-yellow-500 text-center mb-8">
        Available Books
      </h1>

      {/* Filters */}
      <div className="mb-4 flex justify-center space-x-4">
        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-black"
        >
          <option value="">All Colleges</option>
          {[...new Set(books.map((book) => book.collegeName))].map((college) => (
            <option key={college} value={college}>
              {college}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-black"
        >
          <option value="">All Subjects</option>
          {[...new Set(books.map((book) => book.category))].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-black"
        >
          <option value="">All Subcategories</option>
          {[...new Set(books.map((book) => book.subcategory))].map(
            (subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            )
          )}
        </select>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-xl font-semibold">Loading books...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-600 mt-8">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      )}

      {/* Display Books */}
      {!loading && !error && filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-2 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col items-center h-[350px]"
            >
              {/* Cover Image */}
              <div className="w-full h-[200px] border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={`http://localhost:5000${book.coverImage}`} // Ensure this matches your backend's static file serving path
                    alt={book.bookName}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500">No Image Available</span>
                )}
              </div>

              {/* Book Details */}
              <div className="mt-2 flex-grow text-center">
                <h2 className="text-sm font-semibold text-black">
                  {book.bookName}
                </h2>
                <p className="text-xs text-black mt-1 font-bold">
                  Seller's College:{" "}
                  <span className="font-semibold">{book.collegeName}</span>
                </p>
                <p className="text-xs text-black mt-1">
                  Subject: {book.category} | Subcategory: {book.subcategory}
                </p>
              </div>

              {/* Price and Contact Button */}
              <div className="mt-2 flex items-center justify-between w-full">
                <p className="text-sm font-bold text-black">₹{book.price}</p>
                <button
                  className="px-2 py-1 bg-yellow text-black rounded-md hover:bg-white hover:text-yellow text-xs"
                  onClick={() =>
                    handleContactSeller(book.bookName, book.whatsappNumber)
                  }
                >
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="text-center text-gray-600 mt-8">
            <p>No books available</p>
            <p>Please try adjusting your filters or check back later.</p>
          </div>
        )
      )}
    </div>
  );
}

export default Buy;
