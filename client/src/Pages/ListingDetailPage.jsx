import "./ListingDetailPage.css";
import Navbar from "../Components/Navbar";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "../Components/CommentSection";
import { fetchListingById } from "../api/listingsAPI";

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadListing = async () => {
      try {
        setLoading(true);
        const data = await fetchListingById(id);
        setListing(data);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [id]);

  return (
    <div className="detail-page">
      <Navbar />

      <main className="detail-container">
        {loading ? (
          <p>Loading listing...</p>
        ) : error ? (
          <p>{error}</p>
        ) : !listing ? (
          <p>Listing not found.</p>
        ) : (
          <>
            <div className="detail-card">
              <img
                src={listing.images || "https://via.placeholder.com/500x300?text=No+Image"}
                alt={listing.title}
                className="detail-image"
              />

              <div className="detail-info">
                <h1>{listing.title}</h1>
                <p className="detail-price">${listing.price}</p>
                <p><strong>Category:</strong> {listing.categories?.display_name || "Uncategorized"}</p>
                <p><strong>Seller:</strong> {listing.users?.name || "Unknown seller"}</p>
                <p><strong>Description:</strong> {listing.description || "No description available."}</p>

                <div className="detail-actions">
                  <button onClick={() => navigate(`/listings/${listing.id}/edit`)}>
                    Edit Listing
                  </button>
                  <button onClick={() => navigate("/listings")}>
                    Back to Listings
                  </button>
                </div>
              </div>
            </div>

            <CommentSection listingId={listing.id} />
          </>
        )}
      </main>
    </div>
  );
};

export default ListingDetailPage;