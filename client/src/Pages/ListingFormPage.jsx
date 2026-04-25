import "./ListingFormPage.css";
import Navbar from "../Components/Navbar";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchListingById, createListing, updateListing } from "../api/listingsAPI";


const ListingFormPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({title: "", price: "", description: "", condition: "", image: "", category_id: ""});

  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const loadListing = async () => {
      try {
        const data = await fetchListingById(id);
        setFormData({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
          condition: data.condition || "",
          image: data.images || "",
          category_id: data.categories?.id || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     console.log("Mock listing created:", formData);
  
  //     alert(
  //       mode === "edit"
  //         ? "Mock edit successful"
  //         : "Mock create successful"
  //     );
  
  //     navigate("/listings");
  //   } catch (err) {
  //     setError(err.message || "Failed to save listing");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "edit") {
        await updateListing(id, formData);
      } else {
        await createListing(formData);
      }

      navigate("/listings");
    } catch (err) {
      setError(err.message || "Failed to save listing");
    }
  };


  return (
    <div className="form-page">
      <Navbar />

      <main className="form-container">
        <h1>{mode === "edit" ? "Edit Listing" : "Create Listing"}</h1>

        {loading ? (
          <p>Loading form...</p>
        ) : (
          <form className="listing-form" onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              name="condition"
              placeholder="Condition"
              value={formData.condition}
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <input
              name="category_id"
              placeholder="Category ID"
              value={formData.category_id}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
            />

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
              <button type="submit">
                {mode === "edit" ? "Save Changes" : "Create Listing"}
              </button>
              <button type="button" onClick={() => navigate("/listings")}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default ListingFormPage;