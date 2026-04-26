const API_BASE_URL = 'http://localhost:3000/api';

async function fetchAllListings() {
  const response = await fetch(`${API_BASE_URL}/listings`);
  if (!response.ok) {
    throw new Error(`Failed to fetch listings: ${response.status}`);
  }
  return response.json();
}

async function fetchAllListingCategories() {
  const response = await fetch(`${API_BASE_URL}/listings/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json();
}

async function fetchListingById(id) {
  const response = await fetch(`${API_BASE_URL}/listings/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch listing by ID: ${id}`);
  }
  return response.json();
}

async function createListing(data) {
  const response = await fetch(`${API_BASE_URL}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create listing: ${response.status}`);
  }
  return response.json();
}

async function updateListing(id, data) {
  const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update listing: ${id}`);
  }
  return response.json();
}

async function deleteListing(id) {
  const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete listing: ${id}`);
  }
  return response.json();
}

export { fetchAllListings, fetchListingById, createListing, updateListing, deleteListing, fetchAllListingCategories };
