import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyListings() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userToken) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://learndu-services-backend.onrender.com/api/books/mine", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setBooks(response.data.books);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login"); // Logout user if unauthorized
        } else {
          setError("Failed to fetch your listings. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [userToken, navigate]);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`https://learndu-services-backend.onrender.com/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      alert("Book deleted successfully!");
    } catch (err) {
      alert("Failed to delete the book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">My Listings</h1>

      {loading && <p className="text-center text-black">Loading your listings...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && books.length === 0 && <p className="text-center text-black">You have no books listed.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.bookName} className="h-40 w-full object-cover mb-4 rounded" />
            ) : (
              <div className="h-40 bg-gray-100 flex items-center justify-center mb-4">
                <p className="text-black">No Image</p>
              </div>
            )}
            <h2 className="text-lg font-semibold">{book.bookName}</h2>
            <p className="text-sm text-gray-600">College: {book.collegeName}</p>
            <p className="text-sm text-black">Price: ₹{book.price}</p>
            <button onClick={() => handleDelete(book._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
