import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.jsx"; // Ensure authentication check
import { useNavigate } from "react-router-dom";

function Sell() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    collegeName: "",
    bookName: "",
    category: "",
    subcategory: "",
    price: "",
    mrp: "",
    coverImage: null,
  });

  // Category Options
  const categoryOptions = {
    Commerce: ["Accounting", "Business Studies", "Economics"],
    Humanities: ["History", "Political Science", "Sociology"],
    Science: ["Physics", "Chemistry", "Biology"],
    Others: ["Novels", "Self-help", "Other Educational"],
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSubcategories(categoryOptions[category] || []);
    setFormData({ ...formData, category, subcategory: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 100 * 1024) { // 100KB limit
        setSuccessMessage("❌ File size exceeds 100KB. Please upload a smaller file.");
        setFormData({ ...formData, coverImage: null });
        return;
      }

      setFormData({ ...formData, coverImage: file });
      setSuccessMessage("📚 Book cover uploaded successfully!");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "https://learndu-services-backend.onrender.com/api/books",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response.data);
      setFormData({
        name: "",
        whatsappNumber: "",
        collegeName: "",
        bookName: "",
        category: "",
        subcategory: "",
        price: "",
        mrp: "",
        coverImage: null,
      });
      setSelectedCategory("");
      setSubcategories([]);
      setSuccessMessage("✅ Book details submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("❌ Error submitting form. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center text-yellow mb-6 pt-7">
          Sell Your Book
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name and WhatsApp Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 bg-white text-black"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 bg-white text-black"
                placeholder="Enter your WhatsApp number"
                required
              />
            </div>
          </div>

          {/* College Name and Book Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-medium">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 bg-white text-black"
                placeholder="Enter your college name"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium">Book Name</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 bg-white text-black"
                placeholder="Enter the book name"
                required
              />
            </div>
          </div>

          {/* Select Book Category */}
          <div>
            <label className="block text-black font-medium mb-2">
              Select Book Category
            </label>
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 bg-white text-black"
              required
            >
              <option value="">Choose a category</option>
              {Object.keys(categoryOptions).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          {subcategories.length > 0 && (
            <div>
              <label className="block text-black font-medium mb-2">
                Select Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 bg-white text-black"
                required
              >
                <option value="" disabled>
                  Choose a subcategory
                </option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}

                    {/* Book Cover Upload */}
                    <div>
            <label className="block text-black font-medium mb-2">
              Upload Book Cover Page (Max Size: 100KB)
            </label>
            <div className="border-dashed border-2 border-yellow-500 p-4 rounded-lg text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-yellow font-bold">
                  <span className="text-lg">📤</span> Click Here to Upload File
                </div>
              </label>
            </div>

            {/* Success/Error Message */}
            {successMessage && (
              <div className={ `mt-2 text-center font-semibold ${successMessage.includes("❌") ? "text-red" : "text-green"}`}>
                {successMessage}
              </div>
            )}
          </div>

           {/* Drive Link and Price */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center md:text-left">
              <label className="block text-black font-medium">
                Selling Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="Enter price"
                required
              />
            </div>
            <div className="text-center md:text-left">
              <label className="block text-black font-medium">MRP (₹)</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white  text-black focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="Enter MRP"
                required
              />
            </div>
          </div>

         

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full p-2 mt-4 rounded bg-yellow hover:bg-grey text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sell;
