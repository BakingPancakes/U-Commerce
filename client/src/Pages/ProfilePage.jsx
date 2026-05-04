import "./ProfilePage.css";
import Navbar from "../Components/Navbar";
import { fetchListingByUserId } from "../api/listingsAPI";
import { useState, useEffect } from "react";

const mockUser = {
  id: 1,
  name: "Rudraksh Sharma",
  email: "rudraksh@example.com",
  university: "UMass Amherst",
  major: "Computer Science",
  bio: "Graduate student who loves buying and selling useful college items.",
  joined: "January 2026",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
};

const likedListings = [
  {
    id: 3,
    title: "Twin XL Bed Frame",
    price: 90,
    condition: "Used - Fair",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Calculus Textbook",
    price: 25,
    condition: "Used - Fair",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
];

function ListingCard({ item }) {
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

        <button className="profile-action-btn">View Listing</button>
      </div>
    </article>
  );
}


function ProfilePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchListingByUserId("f82c260a-3c04-43d9-995f-7670c184cd6c");//hardcoded user for now
        setListings(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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
          <img src={mockUser.avatar} alt={mockUser.name} className="profile-avatar" />

          <div className="profile-info-text">
            <h2>{mockUser.name}</h2>
            <p><strong>Email:</strong> {mockUser.email}</p>
            <p><strong>University:</strong> {mockUser.university}</p>
            <p><strong>Major:</strong> {mockUser.major}</p>
            <p><strong>Joined:</strong> {mockUser.joined}</p>
            <p><strong>Bio:</strong> {mockUser.bio}</p>

            <div className="profile-buttons">
              <button className="edit-profile-btn">Edit Profile</button>
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
            <span>{likedListings.length} item(s)</span>
          </div>

          <div className="profile-listings-grid">
            {likedListings.length > 0 ? (
              likedListings.map((item) => <ListingCard key={item.id} item={item} />)
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