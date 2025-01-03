export async function login({ email, password }) {
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // });

  // if (error) throw new Error(error.message);

  // return data;
  const url = "http://localhost:3000/api/auth/login";
  try{
    const response = await fetch(url, {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email, password})
    })
    const result = await response.json();
    return result;
  }catch(error){
    throw new Error(error.message);
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
  
}