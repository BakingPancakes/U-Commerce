
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
import { useMemo, useState } from "react";

const listingsData = [
  {
    id: 1,
    title: "MacBook Air M1",
    price: 650,
    category: "Electronics",
    condition: "Used - Good",
    seller: "Riya",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Twin XL Bed Frame",
    price: 90,
    category: "Furniture",
    condition: "Used - Fair",
    seller: "Aman",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Calculus Textbook",
    price: 25,
    category: "Books",
    condition: "Like New",
    seller: "Sarah",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Desk Lamp",
    price: 18,
    category: "Home",
    condition: "Used - Good",
    seller: "Kevin",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "iPad 9th Gen",
    price: 220,
    category: "Electronics",
    condition: "Used - Excellent",
    seller: "Neha",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Study Chair",
    price: 45,
    category: "Furniture",
    condition: "Used - Good",
    seller: "David",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
];

const ListingsPage = ()  => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const categories = ["All", ...new Set(listingsData.map((item) => item.category))];

  const filteredListings = useMemo(() => {
    let filtered = listingsData.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

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
  }, [searchTerm, selectedCategory, sortOption]);

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
        </section>

        <section className="results-info">
          <h2>Available Listings</h2>
          <span>{filteredListings.length} item(s)</span>
        </section>

        <section className="listings-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <article key={item.id} className="listing-card">
                <img src={item.image} alt={item.title} className="listing-image" />

                <div className="listing-content">
                  <div className="listing-top">
                    <h3>{item.title}</h3>
                    <span className="price">${item.price}</span>
                  </div>

                  <p className="category">{item.category}</p>

                  <div className="meta">
                    <span>{item.condition}</span>
                    <span>Seller: {item.seller}</span>
                    <span>⭐ {item.rating}</span>
                  </div>

                  <button className="view-btn">View Details</button>
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
