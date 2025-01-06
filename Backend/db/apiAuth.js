export async function login({ email, password }) {
  const url = "http://localhost:3000/api/auth/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}


export async function signup({ username, email, password }) {
  const url = "http://localhost:3000/api/auth/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const result = await response.json()
    console.log("result", result);
    
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser(){
  const user  = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  if(!user) return null;
  if(error) throw new Error(error.message);
  const role = token? 'authenticated': "notAuthenticated"
  return role;
}