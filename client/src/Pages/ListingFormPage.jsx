import "./ListingFormPage.css";
import Navbar from "../Components/Navbar";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchListingById, createListing, updateListing, fetchAllListingCategories } from "../api/listingsAPI";
import { useProfile } from "../contexts/UserHooks";

import { useAuth0 } from "@auth0/auth0-react";

const ListingFormPage = ({ mode }) => {
  
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: "",
    category_id: ""
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState("");

  const { profile, profileReady } = useProfile();

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllListingCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, []);

  // Load listing if editing
  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const loadListing = async () => {
      try {
        const data = await fetchListingById(id);

        setFormData({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
          images: data.images || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const token = await getAccessTokenSilently();
    
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        listing_type_id: 1,
        images: formData.images,
        user_id: profile.id   // ← HERE
      };
    
      if (mode === "edit") {
        await updateListing(id, payload, token);
      } else {
        await createListing(payload, token);
      }
    
      navigate("/listings");
    } catch (err) {
      setError(err.message || "Failed to save listing");
    }
  };


  if (!profileReady) {
    return (
      <div className="form-page">
        <Navbar />
        <p>Loading user...</p>
      </div>
    );
  }

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
              name="images"
              placeholder="Image URL"
              value={formData.images}
              onChange={handleChange}
            />

            {/* CATEGORY DROPDOWN */}
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.display_name}
                </option>
              ))}
            </select>

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
