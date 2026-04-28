const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchUserByID(token) {
  const response = await fetch(`${API_BASE_URL}/users`,{
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (response.status === 404){
    return null;
  }

  if (!response.ok) {
    throw new Error(`${response.status} Failed to fetch user by ID`);
  }
  return response.json();
}

export async function createUser(token, sub, email, name, college) {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }, 
        body: JSON.stringify({sub, email, name, college}),
    });

    if (!response.ok) {
        throw new Error(`${response.status} Failed to create user with email: ${email}`)
    }

    return response.json()
}
