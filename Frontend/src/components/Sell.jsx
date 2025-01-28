import React, { useState } from "react";

function Sell() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    collegeName: "",
    bookName: "",
    category: "",
    subcategory: "",
    price: "",
    driveLink: "",
    coverImage: null, // For the book cover file
  });

  // Subcategory options
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
    setFormData({ ...formData, category }); // Update form data
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        alert("Book submitted successfully!");
        setFormData({
          name: "",
          whatsappNumber: "",
          collegeName: "",
          bookName: "",
          category: "",
          subcategory: "",
          price: "",
          driveLink: "",
          coverImage: null,
        });
        setSelectedCategory("");
        setSubcategories([]);
      } else {
        alert("Failed to submit the book. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-28">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center text-yellow-500 mb-6 pt-7">
          Sell Your Book
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name and WhatsApp Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
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
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="Enter your WhatsApp number"
                required
              />
            </div>
          </div>

          {/* College Name and Book Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-medium">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
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
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
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
            <div className="flex items-center space-x-4">
              {Object.keys(categoryOptions).map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                    className="appearance-none w-4 h-4 border-2 border-black rounded-full bg-gray checked:bg-yellow focus:ring-2 focus:ring-yellow focus:ring-offset-2 transition"
                    required
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Dropdown */}
          {subcategories.length > 0 && (
            <div className="mt-4">
              <label className="block text-black font-medium mb-2">
                Select Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
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

          {/* Upload Book Cover */}
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
          </div>

          {/* Drive Link and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-medium">
                Drive Link of Book Index
              </label>
              <input
                type="text"
                name="driveLink"
                value={formData.driveLink}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="Enter drive link"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow text-black px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-yellow"
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
