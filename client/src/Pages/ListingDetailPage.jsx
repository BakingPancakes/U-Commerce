import "./ListingDetailPage.css";
import Navbar from "../Components/Navbar";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "../Components/CommentSection";
import { fetchListingById } from "../api/listingsAPI";
import { useProfile } from "../contexts/UserHooks";
import { deleteListing } from "../api/listingsAPI";
import { createFavorite, deleteFavorite, fetchFavoritesByUserID } from "../api/favoritesAPI";


const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { profile, profileReady } = useProfile();

  const [ favoriteID, setFavoriteID ] = useState(null);
  const [ isFavorite, setIsFavorite ] = useState(false);

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

  useEffect(() => {
    const loadFavorites = async () => {
      if (profile && listing) {
        const favorites = await fetchFavoritesByUserID(profile.id);
        const favoriteData = favorites.find(obj => obj.listing_id === listing.id);
        if (favoriteData) {
          setIsFavorite(true)
          setFavoriteID(favoriteData.id)
        }
      }
    }

    loadFavorites();
  }, [profile, listing, isFavorite]);

  const isOwner = profileReady && profile && listing?.owner_id === profile.id;

  const handleAddFavorite = async () => {
    try {
      await createFavorite(profile.id, listing.id);
      setIsFavorite(true);
    } catch (err) {
      console.log("Failed to add listing to favorites:", err);
      alert("Sorry, we couldn't add listing to your favorites list.");
    }
  }

  const handleDeleteFavorite = async () => {
    try {
      console.log(favoriteID)
      await deleteFavorite(favoriteID);
      setIsFavorite(false);
    } catch (err) {
      console.log("Failed to delete listing from favorites:", err);
      alert("Sorry, we couldn't delete this listing from your favorites list.")
    }
  }

  const handleDeleteListing = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await deleteListing(listing.id);
      navigate("/listings");
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing.");
    }
  };


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
                  { isOwner && (
                    <>
                      <button onClick={() => navigate(`/listings/${listing.id}/edit`)}>
                        Edit Listing
                      </button>

                      <button className="delete-btn" onClick={handleDeleteListing}>
                        Delete Listing
                      </button>
                    </> 
                  )}

                  <button onClick={() => navigate("/listings")}>
                    Back to Listings
                  </button>

                  { profile && (
                    isFavorite ? (
                      <button onClick={handleDeleteFavorite}>
                        Remove from Favorites ⭐
                      </button>
                    )
                    : (
                      <button onClick={handleAddFavorite}>
                        Add to Favorites ⭐
                      </button>
                    )
                  )}
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
