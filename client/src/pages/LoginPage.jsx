import { useState } from 'react'

export default function LoginPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'Post',
      body: JSON.stringify({username, password}),
      headers: {'Content-type':'application/json'},
    });
    console.log(response)
    if(response.status === 400){
      alert("Wrong username or password.");
    }
    if(response.status === 200){
      alert("Data is correct.")
    }
  }
  return(
    <form className='login' onSubmit={login}>
      <input type='text' placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)}/>
      <input type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
  )
}