import "./ProfilePage.css";
import Navbar from "../Components/Navbar";
import { fetchListingById, fetchListingByUserId } from "../api/listingsAPI";
import { useState, useEffect } from "react";
import { useProfile } from "../contexts/UserHooks";
import { getCollegeName } from "../utils";
import { updateUser } from "../api/userAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { fetchFavoritesByUserID } from "../api/favoritesAPI";

function formatJoinDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


function ListingCard({ item }) {
  const navigate = useNavigate();
  return (
    <article className="profile-listing-card">
      <img
        src={item.images?.[0] || "/placeholder.png"}
        alt={item.title}
        className="profile-listing-image"
      />

      <div className="profile-listing-content">
        <div className="profile-listing-top">
          <h3>{item.title}</h3>
          <span className="profile-price">${item.price}</span>
        </div>

        <p className="profile-condition">
          {item.categories?.display_name || "No category"}
        </p>

        <button
          className="profile-action-btn"
          onClick={() => navigate(`/listings/${item.id}`)}
        >
          View Listing
        </button>

      </div>
    </article>
  );
}


function ProfilePage() {
  const { profile, profileReady, refreshProfile } = useProfile();
  const { getAccessTokenSilently } = useAuth0();
  const [listings, setListings] = useState([]);
  const [favoritedListings, setFavoritedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBio, setEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(profile?.bio || "");

   useEffect(() => {
    const fetchUserListings = async () => {
      if (!profileReady || !profile?.id) return;

      try {
        setLoading(true);
        const listingsData = await fetchListingByUserId(profile.id);
        setListings(listingsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavoritedListings = async () => {
      if (!profileReady || !profile?.id) return;

      try {
        const favorites = await fetchFavoritesByUserID(profile.id);
        const listings = [];
        for (const fav of favorites) {
          const listing = await fetchListingById(fav.listing_id);
          listings.push(listing)
        }
        setFavoritedListings(listings)
      } catch (err) {
        console.error("Error fetching favorited listings:", err)
      }
    }

    fetchFavoritedListings();
    fetchUserListings();
  }, [profileReady, profile]);

  const handleSaveBio = async () => {
    try {
      const token = await getAccessTokenSilently();

      await updateUser(token, profile.id, { bio: bioDraft });

      // Refresh global profile state
      await refreshProfile();

      setEditingBio(false);
    } catch (err) {
      console.error("Failed to update bio:", err);
    }
  }


  if (!profileReady) {
    return (
      <div className="profile-page">
        <Navbar />
        <p className="loading-state">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <header className="profile-hero">
        <div className="profile-hero-content">
          <h1>My Profile</h1>
          <p>Manage your personal information, posted listings, and liked listings.</p>
        </div>
      </header>

      <main className="profile-container">
        <section className="profile-info-card">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />

          <div className="profile-info-text">
            <h2>{profile.name}</h2>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>University:</strong> {getCollegeName(profile.college_id)}</p>
            <p><strong>Joined:</strong> {formatJoinDate(profile.created_at)}</p>
            <div className="profile-bio-section">
              <strong>Bio:</strong>

              {editingBio ? (
                <>
                  <textarea
                    className="bio-textarea"
                    value={bioDraft}
                    onChange={(e) => setBioDraft(e.target.value)}
                  />

                  <div className="bio-buttons">
                    <button className="save-btn" onClick={handleSaveBio}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingBio(false)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{profile.bio || "No bio yet."}</p>
                  <button className="edit-profile-btn" onClick={() => setEditingBio(true)}>
                    Edit Bio
                  </button>
                </>
              )}
            </div>

          </div>
        </section>

        <section className="profile-section">
        <div className="profile-section-header">
          <h2>My Listings</h2>
          <span>{listings.length} item(s)</span>
        </div>

        {loading ? (
          <div className="profile-loading-state">
            <p>Loading your listings...</p>
          </div>
        ) : error ? (
          <div className="profile-error-state">
            <p>Error: {error}</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="profile-listings-grid">
            {listings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="profile-empty-state">
            <p>You have not posted any listings yet.</p>
          </div>
        )}
      </section>


        <section className="profile-section">
          <div className="profile-section-header">
            <h2>Liked Listings</h2>
            <span>{favoritedListings.length} item(s)</span>
          </div>

          <div className="profile-listings-grid">
            {favoritedListings.length > 0 ? (
              favoritedListings.map((item) => <ListingCard key={item.id} item={item} />)
            ) : (
              <div className="profile-empty-state">
                <p>You have not liked any listings yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;