import Navbar from '../Components/Navbar';

//const ListingsPage = () => {
//  return (
//    <main>
//        <Navbar /> 
//        <h1>Listings Page</h1>
//    </main>
//  );
//};

import "./ListingsPage.css";
import { useMemo, useState, useEffect } from "react";
import { fetchAllListings } from '../api/listingsAPI';
import { useNavigate } from "react-router-dom";

const ListingsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", ...new Set(listings.map((item) => item.categories.display_name))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllListings();
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

  const filteredListings = useMemo(() => {
    let filtered = listings.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.categories.display_name === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortOption === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortOption, listings]);

  return (
    <div className="app">
      <Navbar />
      <header className="hero">
        <div className="hero-content">
          <h1>U-Commerce Listings</h1>
          <p>Buy and sell items easily within your college community.</p>
        </div>
      </header>

      <main className="container">
        <section className="controls">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-control"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select-control"
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

        <button
            className="create-btn"
            onClick={() => navigate("/listings/new")}
          >
            Create Listing
          </button>
        </section>

        <section className="results-info">
          <h2>Available Listings</h2>
          <span>{filteredListings.length} item(s)</span>
        </section>

        <section className="listings-grid">
          {loading ? (
            <div className="loading-state">
              <p>Loading listings...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error: {error}</p>
            </div>
          ) : filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <article key={item.id} className="listing-card">
                <img src={item.images} alt={item.title} className="listing-image" />

                <div className="listing-content">
                  <div className="listing-top">
                    <h3>{item.title}</h3>
                    <span className="price">${item.price}</span>
                  </div>

                  <p className="category">{item.categories?.display_name}</p>


                  <div className="meta">
                    <span>{item.condition}</span>
                    <span>Seller: {item.users.name}</span>
                    <span>Rating: {item.rating}</span>
                  </div>

                  <button
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/listings/${item.id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h3>No listings found</h3>
              <p>Try changing your search or filter options.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ListingsPage;
