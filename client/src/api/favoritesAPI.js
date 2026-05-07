const API_BASE_URL = 'http://localhost:3000/api';

async function fetchFavoritesByUserID(user_id) {
    const response = await fetch(`${API_BASE_URL}/favorites/${user_id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch favorite: ${response.status}`);
    }
    return response.json();
}

async function createFavorite(user_id, listing_id) {
    const response = await fetch(`${API_BASE_URL}/favorites/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id,
            listing_id: listing_id
        })
    });
    if (!response.ok) {
        throw new Error(`Failed to create new favorite: ${response.status}`);
    }
    return response.json();
}

async function deleteFavorite(favorite_id) {
    const response = await fetch(`${API_BASE_URL}/favorites/${favorite_id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete favorite: ${response.status}`);
    }
    return response.json();
}

export { fetchFavoritesByUserID, createFavorite, deleteFavorite }