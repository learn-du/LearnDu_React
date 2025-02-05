import React, { useEffect, useState } from "react";
import axios from "axios";

function MyListings() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userToken = localStorage.getItem("token"); // Assuming token is saved after login

  // Fetch user's listed books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books/mine", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setBooks(response.data.books);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your listings. Please try again.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [userToken]);

  // Delete a book
  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.status === 200) {
        alert("Book deleted successfully!");
        setBooks(books.filter((book) => book._id !== bookId)); // Remove the deleted book from the UI
      }
    } catch (err) {
      alert("Failed to delete the book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">My Listings</h1>

      {loading && <p className="text-center text-black">Loading your listings...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-black">You have no books listed.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center mb-4">
              <p className="text-black">Book Image</p>
            </div>
            <h2 className="text-lg font-semibold">{book.bookName}</h2>
            <p className="text-sm text-gray-600">
              College: {book.collegeName}
            </p>
            <p className="text-sm text-black">Price: ₹{book.price}</p>
            <button
              onClick={() => handleDelete(book._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
