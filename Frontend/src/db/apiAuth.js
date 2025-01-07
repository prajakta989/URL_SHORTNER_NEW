export async function login({ email, password }) {
  const url = "http://localhost:8080/api/auth/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    const data = await response.json();
    console.log("messages",data.message );
    
    if (!response.ok) {
      // If the response is not ok, check for specific status codes
      if (response.status === 401) {
        // Handle specific error, like email already exists
        throw new Error(data.message);
      }
      // Handle any other error (e.g., 400, 500, etc.)
      throw new Error(data.message || 'Failed to login');
    }

    

    // Return the successful response data
    return data;

  } catch (error) {
    throw new Error(error.message);
  }
}


export async function signup({ username, email, password }) {
  const url = "http://localhost:8080/api/auth/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    // Parse the response body only once
    const data = await response.json();
    console.log("messages",data.message );
    
    if (!response.ok) {
      // If the response is not ok, check for specific status codes
      if (response.status === 409) {
        // Handle specific error, like email already exists
        throw new Error(data.message);
      }
      // Handle any other error (e.g., 400, 500, etc.)
      throw new Error(data.message || 'Failed to register');
    }

    

    // Return the successful response data
    return data;

  } catch (error) {
    // Handle any errors, whether from the fetch or from status checks
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user) return null;
    
    const role = token ? 'authenticated' : 'notAuthenticated';
    return role;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user");
  }
}
